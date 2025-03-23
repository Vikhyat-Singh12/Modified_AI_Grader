import numpy as np
import pandas as pd
from xgboost import XGBRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import joblib

# Load your training data
essay_dataframe = pd.read_csv('C:/Users/DELL/OneDrive/Desktop/solution Challeng/AI grader/flask _api/data_train_main.csv')
# Split the data into features and target
X = essay_dataframe.drop(['Score','Essay ID', 'Essay Set'], axis=1)
Y = essay_dataframe['Score']

# Split the data into training and testing sets
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.15, random_state=42)

# Initialize and train the XGBoost regressor
model = XGBRegressor(objective='reg:squarederror', colsample_bytree=1, learning_rate=0.1, max_depth=5, alpha=10, n_estimators=2000)
model.fit(X_train, Y_train)

# Evaluate the model
training_predictions = model.predict(X_train)
testing_predictions = model.predict(X_test)
train_rmse = np.sqrt(mean_squared_error(Y_train, training_predictions))
test_rmse = np.sqrt(mean_squared_error(Y_test, testing_predictions))

print(f"Training RMSE: {train_rmse}")
print(f"Testing RMSE: {test_rmse}")

# Save the trained model
joblib.dump(model, 'xgboost_model.pkl')
print("Model saved as xgboost_model.pkl")


