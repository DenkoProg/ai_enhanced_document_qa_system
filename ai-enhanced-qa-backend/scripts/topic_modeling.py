import os
import pinecone
import nltk
import re
from dotenv import load_dotenv
from gensim import corpora, models
from nltk.corpus import stopwords

load_dotenv()

pc = pinecone.Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
index_name = os.getenv("PINECONE_INDEX_NAME")

index = pc.Index(index_name)

nltk.download('punkt')
nltk.download('punkt_tab')
nltk.download('stopwords')


def fetch_documents():
    query_response = index.query(vector=[0] * 1536, top_k=1000, include_metadata=True)
    documents = [{"id": match["id"], "text": match["metadata"]["text"]} for match in query_response["matches"]]
    return documents


def perform_topic_modeling(documents):
    stop_words = set(stopwords.words('english'))
    texts = [
        [word for word in nltk.word_tokenize(doc["text"].lower()) if word.isalnum() and word not in stop_words]
        for doc in documents
    ]
    dictionary = corpora.Dictionary(texts)
    corpus = [dictionary.doc2bow(text) for text in texts]
    lda_model = models.LdaModel(corpus, num_topics=2, id2word=dictionary, passes=15)

    topics = []
    for topic in lda_model.print_topics(num_words=4):
        topic_keywords = re.findall(r'\"(.*?)\"', topic[1])
        topics.append(" ".join(topic_keywords))
    return topics


def update_metadata(documents, topics):
    for i, doc in enumerate(documents):
        topic = topics[i % len(topics)]
        index.update(id=doc["id"], set_metadata={"topic": topic})


if __name__ == "__main__":
    docs = fetch_documents()
    topics = perform_topic_modeling(docs)
    print("Extracted Topics:", topics)
    update_metadata(docs, topics)
