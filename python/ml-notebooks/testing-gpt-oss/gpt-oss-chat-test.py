from transformers import AutoModelForCausalLM, AutoTokenizer

model_name = "/usr/local/lib/gpt-oss-20b-MLX-8bit"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

prompt = "What is the capital of France?"
inputs = tokenizer(prompt, return_tensors="pt")
outputs = model.generate(**inputs, max_new_tokens=50)
print(tokenizer.decode(outputs[0], skip_special_tokens=True))


##
# cd /home/kartikjha/Documents/code/code-quiver ; /usr/bin/env /home/kartikjha/Documents/tools/miniconda3/bin/python /home/kartikjha/.vscode/extensions/ms-python.debugpy-2025.10.0-linux-x64/bundled/libs/debugpy/adapter/../../debugpy/launcher 57563 -- /home/kartikjha/Documents/code/code-quiver/python/ml-notebooks/testing-gpt-oss/gpt-oss-chat-test.py 

##