# Git 常用命令

## 合并远程仓库分支到本地分支

1. git pull

【有风险】获取最新代码到本地，并自动合并到当前分支。
首先我们用命令行$git remote -v 去查询当前代码仓的远端分支；
然后直接去拉取并合并最新的代码（因为是直接合并，无法提前处理冲突，不推荐）；
$ git pull origin master 即拉取远端 origin/master 分支并合并到当前分支；
$ git pull origin test 即拉取远端 origin/test 分支并合并到当前分支。

2. git fetch + merge （需要额外的本地分支）
   首先我们用命令行$git remote -v 去查询当前代码仓的所有远端分支；
然后用命令行$git fetch origin dev:tempBranch 获取最新代码到本地临时分支（自定义为 tempBranch），获取到的远端分支为 origin/dev；
   用命令行$git diff tempBranch去查看本地tempBranch分支和当前分支的版本差异；
接着用命令行$git merge tempBranch 合并本地临时分支 tempBranch 到当前分支；
   最后用命令行$git branch -D tempBranch 来删除该临时分支；
   不推荐这种方式，因为需要建立并删除这个额外的本地分支。

3. git fetch + merge （不额外建立本地分支）
   首先我们用命令行$git remote -v 去查询当前代码仓的所有远端分支；
然后用命令行$git fetch origin dev 来获取远端的 origin/dev 分支的最新代码到本地（假设本地当前分支为 dev）
   接着用命令行$git log -p dev..origin/dev 去查看本地dev分支和当前分支的版本差异；
最后用命令行$git merge origin/dev 来合并远端分支 origin/dev 到当前分支。
   推荐这种方式，可以不用额外建立本地分支。

```shell
# git diff命令比较本地分支与远程分支之间的差异
git diff <local_branch> <remote_branch>
# git diff dev origin/dev
```
