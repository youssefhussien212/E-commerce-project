from flask import Blueprint, request, jsonify
import pandas as pd

bp = Blueprint('routes', __name__)

# Load data
def load_data(file_path):
    return pd.read_csv(file_path)

interactions_df = load_data('data/interactions.csv')

# Calculate the most popular items
def get_popular_items(df, top_n=5):
    popular_items = df['item_id'].value_counts().head(top_n).index.tolist()
    return popular_items

@bp.route('/popular', methods=['GET'])
def popular():
    top_n = int(request.args.get('top_n', 5))
    popular_items = get_popular_items(interactions_df, top_n)
    return jsonify(popular_items)