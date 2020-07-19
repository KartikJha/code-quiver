class BrowserHistory:

	def __init__(self, homepage: str):
		self.history = [homepage]
		self.curr = 0

	def visit(self, url: str) -> None:
		if self.curr < len(self.history) - 1:
			del self.history[self.curr + 1:]
		self.history.append(url)
		self.curr = self.curr + 1

	def back(self, steps: int) -> str:
		if steps > self.curr:
			self.curr = 0
			return self.history[0]
		self.curr = self.curr - steps
		return self.history[self.curr]

	def forward(self, steps: int) -> str:
		if steps > len(self.history) - self.curr - 1:
			self.curr = len(self.history) - 1
			return self.history[-1]
		self.curr = self.curr + steps
		return self.history[self.curr]

bh = BrowserHistory('a')
bh.visit('b')
bh.visit('c')
print(bh.back(2))
print(bh.forward(2))