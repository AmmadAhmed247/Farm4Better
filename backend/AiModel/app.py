from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# === Load model ===
MODEL_PATH = "Cotton_mobilenetv2.h5"
model = tf.keras.models.load_model(MODEL_PATH)

# === Class names ===
class_names = [
    'Bacterial Blight',
    'Curl Virus',
    'Healthy Leaf',
    'Herbicide Growth Damage',
    'Leaf Hopper Jassids',
    'Leaf Redding',
    'Leaf Variegation'
]

@app.route('/')
def home():
    return "✅ Cotton Leaf Disease Detection API is running!"

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'Empty filename'}), 400

    img_path = "temp_img.jpg"
    file.save(img_path)

    # Preprocess image
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    # Prediction
    preds = model.predict(img_array)
    pred_idx = int(np.argmax(preds[0]))
    confidence = float(preds[0][pred_idx]) * 100  # number in percent

    result = {
        "predicted_class": class_names[pred_idx],
        "confidence": confidence
    }

    # Clean up temp file
    try:
        os.remove(img_path)
    except:
        pass

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
