from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

# Load the trained model
model = joblib.load("c:/Users/DELL/OneDrive/Desktop/ai !/AI-Grader/flask _api/xgboost_model.pkl")

def transform_data(raw_data):
    word_count = raw_data['Word Count']
    sentence_count = raw_data['Sentence Count']
    long_sentences = raw_data['Long Sentences']
    active_voice = raw_data['Active Voice Sentences']
    passive_voice = raw_data['Passive Voice Sentences']
    past_tense = raw_data['Past Tense Sentences']
    present_tense = raw_data['Present Tense Sentences']
    spelling_errors = raw_data['Spelling Errors']
    grammatical_errors = raw_data['Grammatical Errors']
    intermediate_vocab = raw_data['Intermediate Vocabulary Words']
    advanced_vocab = raw_data['Advanced Vocabulary Words']

    # Transformations
    word_count_limit_ratio = word_count / 500
    long_sentences_ratio = long_sentences / sentence_count
    voice_ratio = active_voice / (active_voice + passive_voice)
    tense_ratio = present_tense / (past_tense + present_tense)
    spell_errors_ratio = spelling_errors / word_count
    grammatical_errors_ratio = grammatical_errors / word_count
    vocabulary_ratio = (intermediate_vocab + advanced_vocab) / word_count

    transformed_data = {
        "Word count limit ratio": [word_count_limit_ratio],
        "Long sentences": [long_sentences_ratio],
        "Voice": [voice_ratio],
        "Tense": [tense_ratio],
        "Spell errors": [spell_errors_ratio],
        "Grammatical Errors": [grammatical_errors_ratio],
        "SS Essay": [0.949147099],      # Placeholder for actual value
        "SS Topic Essay": [0.960634183], # Placeholder for actual value
        "Vocabulary": [vocabulary_ratio],
        "Word Count": [word_count],
        "Sentence Count": [sentence_count]
    }

    return transformed_data

@app.route('/predict', methods=['POST'])
def predict():
    raw_data = request.get_json()  # Receive JSON data from the frontend
    transformed_data = transform_data(raw_data)
    essay_features = pd.DataFrame(transformed_data)
    prediction = model.predict(essay_features)[0]
    return jsonify({'score': float(prediction)})  # Return the score as JSON

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000) 