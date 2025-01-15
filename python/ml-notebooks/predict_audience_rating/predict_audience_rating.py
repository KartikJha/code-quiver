# Import necessary libraries
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score


def convert_csv_to_json(csv_path):
    # Load the CSV into a DataFrame
    df = pd.read_csv(csv_path)
    
    # Drop rows with any NaN values in relevant columns
    relevant_columns = [
        'movie_title', 'genre', 'rating', 'runtime_in_minutes', 
        'studio_name', 'tomatometer_rating', 'audience_rating'
    ]
    df = df.dropna(subset=relevant_columns)
    
    # Extract relevant columns and process them to match the desired structure
    data = {
        'movie_title': df['movie_title'].str.split(':').str[0].tolist(),  # Extracts titles before ':' if present
        'genre': df['genre'].str.split(',').str[0].tolist(),  # Takes the first genre from the list
        'rating': df['rating'].tolist(),
        'runtime_in_m': df['runtime_in_minutes'].tolist(),
        'studio_name': df['studio_name'].str.split().str[0].tolist(),  # Extracts first word of studio names
        'tomatometer': df['tomatometer_rating'].tolist(),
        'audience_rating': df['audience_rating'].tolist()
    }
    
    return data

result = convert_csv_to_json('Rotten_Tomatoes_Movies3.csv')

df = pd.DataFrame(result)
# Load the dataset
# df = pd.read_csv('./python/ml-notebooks/predict_audience_rating/Rotten_Tomatoes_Movies3.csv')

# data = {
#     'movie_title': ['Percy Jackson', 'Please Give', '10', '12 Angry Men', '20,000 Leagues'],
#     'genre': ['Action & Adventure', 'Comedy', 'Comedy, Romance', 'Classics, Drama', 'Action & Adventure'],
#     'rating': ['PG', 'R', 'R', 'NR', 'G'],
#     'runtime_in_m': [83, 90, 118, 95, 127],
#     'studio_name': ['20th Century', 'Sony Pictures', 'Warner Bros.', 'Criterion Coll.', 'Disney'],
#     'tomatometer': [49, 86, 68, 100, 89],
#     'audience_rating': [53, 64, 53, 97, 74]
# }

# # Load dataset into a DataFrame
# df = pd.DataFrame(data)

# Preprocessing
# Encode categorical variables
label_encoders = {}
for col in ['genre', 'rating', 'studio_name']:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    label_encoders[col] = le

# Split data into features and target
X = df.drop(['movie_title', 'audience_rating'], axis=1)
y = df['audience_rating']

# Standardize features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# Train a model
model = LinearRegression()
model.fit(X_train, y_train)

# Predict on test data
y_pred = model.predict(X_test)

# Evaluate the model
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

# Display results
print("Mean Squared Error:", mse)
print("R-squared:", r2)

# Example pipeline working demonstration
def predict_audience_rating(input_data):
    input_df = pd.DataFrame([input_data])
    for col in ['genre', 'rating', 'studio_name']:
        if col in input_df:
            input_df[col] = label_encoders[col].transform(input_df[col])
    input_scaled = scaler.transform(input_df)
    return model.predict(input_scaled)

# Test prediction
sample_input = {
    'genre': 'Action & Adventure',
    'rating': 'PG',
    'runtime_in_m': 100,
    'studio_name': 'Disney',
    'tomatometer': 85
}
print("Predicted Audience Rating:", predict_audience_rating(sample_input))
