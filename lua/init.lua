-- =============== BOOTSTRAP lazy.nvim ===============
vim.opt.rtp:prepend("/usr/local/lib/lazy/lazy.nvim")

require("lazy").setup({
  -- Core
  { 'nvim-lua/plenary.nvim' },
  { 'nvim-treesitter/nvim-treesitter', build = ':TSUpdate' },

  -- LSP & Completion
  { 'neovim/nvim-lspconfig' },
  { 'williamboman/mason.nvim' },
  { 'williamboman/mason-lspconfig.nvim', version = '*' }, -- pinned stable
  { 'hrsh7th/nvim-cmp' },
  { 'hrsh7th/cmp-nvim-lsp' },
  { 'L3MON4D3/LuaSnip' },

  -- Debugging
  { 'mfussenegger/nvim-dap' },
  { 'nvim-neotest/nvim-nio' }, -- required by dap-ui
  { 'rcarriga/nvim-dap-ui' },

  -- Git integration
  { 'lewis6991/gitsigns.nvim' },

  -- Status line
  { 'nvim-lualine/lualine.nvim' },

  -- UI/Quality
  { 'nvim-tree/nvim-web-devicons' },
  { 'nvim-telescope/telescope.nvim' },
})

-- =============== BASIC SETTINGS ===============
vim.o.number = true
vim.o.relativenumber = true
vim.o.tabstop = 2
vim.o.shiftwidth = 2
vim.o.expandtab = true
vim.o.termguicolors = true

-- =============== TREESITTER ===============
require('nvim-treesitter.configs').setup {
  ensure_installed = { "javascript", "typescript", "python", "bash", "lua", "json" },
  highlight = { enable = true },
}

-- =============== LSP SETUP ===============
require("mason").setup()

local lspconfig = require('lspconfig')
local capabilities = require('cmp_nvim_lsp').default_capabilities()

-- Manually setup servers
lspconfig.tsserver.setup { capabilities = capabilities }
lspconfig.pyright.setup { capabilities = capabilities }
lspconfig.bashls.setup { capabilities = capabilities }

-- =============== COMPLETION ===============
local cmp = require'cmp'
cmp.setup {
  snippet = { expand = function(args) require'luasnip'.lsp_expand(args.body) end },
  mapping = cmp.mapping.preset.insert({
    ['<C-Space>'] = cmp.mapping.complete(),
    ['<CR>'] = cmp.mapping.confirm({ select = true }),
  }),
  sources = cmp.config.sources({
    { name = 'nvim_lsp' },
  })
}

-- =============== DAP SETUP ===============
local dap = require('dap')
local dapui = require('dapui')

dapui.setup()

-- Auto open/close UI
dap.listeners.after.event_initialized["dapui_config"] = function()
  dapui.open()
end
dap.listeners.before.event_terminated["dapui_config"] = function()
  dapui.close()
end
dap.listeners.before.event_exited["dapui_config"] = function()
  dapui.close()
end

-- Python Debug Adapter
dap.adapters.python = {
  type = 'executable',
  command = 'python3',
  args = { '-m', 'debugpy.adapter' },
}
dap.configurations.python = {
  {
    name = 'Launch Python file',
    type = 'python',
    request = 'launch',
    program = '${file}',
    pythonPath = 'python3',
  },
}

-- Node / JavaScript Debug Adapter
local js_debug_path = "/usr/local/lib/vscode-js-debug" -- your cloned repo
dap.adapters.node2 = {
  type = 'executable',
  command = 'node',
  args = { js_debug_path .. '/out/src/nodeDebug.js' },
}
dap.configurations.javascript = {
  {
    name = 'Launch JS file',
    type = 'node2',
    request = 'launch',
    program = '${file}',
    cwd = vim.fn.getcwd(),
    sourceMaps = true,
    protocol = 'inspector',
  },
}
dap.configurations.typescript = {
  {
    name = 'Launch TS file',
    type = 'node2',
    request = 'launch',
    program = '${file}',
    cwd = vim.fn.getcwd(),
    sourceMaps = true,
    protocol = 'inspector',
  },
}

-- Keybindings for DAP
vim.keymap.set('n', '<F5>', dap.continue)
vim.keymap.set('n', '<F10>', dap.step_over)
vim.keymap.set('n', '<F11>', dap.step_into)
vim.keymap.set('n', '<F12>', dap.step_out)
vim.keymap.set('n', '<Leader>b', dap.toggle_breakpoint)
vim.keymap.set('n', '<Leader>dr', dap.repl.open)

-- =============== GITSIGNS SETUP ===============
require('gitsigns').setup()

-- =============== STATUS LINE ===============
require('lualine').setup {
  options = {
    theme = 'auto',
    section_separators = '',
    component_separators = ''
  }
}

-- =============== TELESCOPE KEYMAPS ===============
vim.keymap.set('n', '<Leader>ff', '<cmd>Telescope find_files<cr>')
vim.keymap.set('n', '<Leader>fg', '<cmd>Telescope live_grep<cr>')
vim.keymap.set('n', '<Leader>fb', '<cmd>Telescope buffers<cr>')
vim.keymap.set('n', '<Leader>fh', '<cmd>Telescope help_tags<cr>')
