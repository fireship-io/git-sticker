import os
import logging
import requests
from dotenv import load_dotenv


load_dotenv()

logger = logging.getLogger("dsa")

# Google Chat settings
GCHAT_KEY = os.environ.get("GCHAT_KEY")


def send_gchat_message(message, thread_key=None, notify_all=False):
    if "Error" in message.split():
        SPACE = "GCHAT_ERROR_SPACE"
    else:
        SPACE = "GCHAT_P_STATUS_SPACE"

    GCHAT_SPACE = os.environ.get(SPACE).split("#")
    GCHAT_WEBHOOK_URL = f"https://chat.googleapis.com/v1/spaces/{GCHAT_SPACE[0]}/messages?key={GCHAT_KEY}&token={GCHAT_SPACE[1]}"

    if notify_all:
        message = f"<users/all> {message}"
    data = {"text": message, "thread": thread_key}
    param = {}
    if thread_key:
        param["messageReplyOption"] = "REPLY_MESSAGE_FALLBACK_TO_NEW_THREAD"
    try:
        response = requests.post(GCHAT_WEBHOOK_URL, json=data, params=param)
        if response.status_code == 200:
            json_response = response.json()
            return json_response.get("thread")
        else:
            logger.error(
                f"Failed to send Google Chat notification. Status code: {response.status_code}"
            )
    except Exception as e:
        logger.error(f"Error sending Google Chat notification: {e}")


if __name__ == "__main__":
    send_gchat_message("Error in handling")
