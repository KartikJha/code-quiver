from mlc_llm.interface.chat import chat
from mlc_llm.json_ffi.engine import JSONFFIEngine

model_path = "/usr/local/lib/gpt-oss-20b-MLX-8bit"  # folder containing mlc-chat-config.json
engine = JSONFFIEngine(model_path)
chat(engine)
