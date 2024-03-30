# WSL

## on-my-zsh 配置文件

```bash
export ZSH="$HOME/.oh-my-zsh"


ZSH_THEME="robbyrussell"


plugins=(git zsh-autosuggestions zsh-syntax-highlighting z history history-substring-search node npm)

source $ZSH/oh-my-zsh.sh


ZSH_THEME="bira"

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# pnpm
export PNPM_HOME="/home/ayu/.local/share/pnpm"
case ":$PATH:" in
  *":$PNPM_HOME:"*) ;;
  *) export PATH="$PNPM_HOME:$PATH" ;;
esac
# pnpm end
figlet "Hi, Ayu ! "
#source ~/.oh-my-zsh/plugins/incr/incr*.zsh
alias cls="clear"
alias gt="git status"
# save the current directory to jump back to it
# alias savez = "source ~/.zshrc"
# open the zshrc file in the code editor
alias zshconfig="code ~/.zshrc"
# set ths proyx
alias proxy='export all_proxy=http://127.0.0.1:7980'
# unset the proxy
alias unproxy='unset all_proxy'
```

**常用命令**

```bash
curl cip.cc  # 查看代理是否成功，如果是外国则代理成功
proxy ? # 设置代理
unproxy # 关闭代理
curl google.com #有返回值则代表代理成功
```
