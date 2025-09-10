###### download quantized

huggingface-cli download lmstudio-community/gpt-oss-20b-MLX-8bit --local-dir /usr/local/lib/gpt-oss-20b-MLX-8bit


###### mlc-llm conversion

python -m mlc_llm convert_weight \
  --model /usr/local/lib/gpt-oss-20b-MLX-8bit \
  --quantization q4f16_1 \
  --output /usr/local/lib/gptoss20b-mlc
