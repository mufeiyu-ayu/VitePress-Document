console.log();# Linux

## 目录结构

```bash
/bin # 二进制文件
/boot # 启动文件
/dev # 设备文件
/etc # 配置文件
/home # 用户目录
/lib # 库文件
/media # 可移动设备
/mnt # 挂载目录
/opt # 第三方软件
/proc # 进程目录
/root # root用户目录
/run # 运行时目录
/sbin # 系统二进制文件
/srv # 服务数据目录
/sys # 系统目录
/tmp # 临时目录
/usr # 用户软件目录
/var # 可变数据目录
...
```

## 常用命令

```bash
pwd # 显示当前目录的绝对路径
cd # 切换目录
cd ./ # 切换到当前目录 ../ 切换到上级目录 / 切换到根目录 - 切换到上次目录
ls -a # 显示隐藏文件以.开头
ls -l | ll # 显示详细信息
ls-lh # 显示详细信息并以人类可读的方式显示文件大小
mkdir folder # 创建目录/文件夹
mkdir -p folder1/folder2 # 创建多级目录
rmdir -P folder # 删除目录/文件夹(可删除多个)
touch file # 创建文件 touch /ayu/file
cp oldFile newFile # 复制文件 -r 复制目录及其子目录
rm file # 删除文件 -r 删除目录及其子目录 -f 强制删除
mv oldFile newFile # 移动文件再重命名文件
cat file # 查看文件内容 -n 显示行号
more file # 分页显示文件内容 空格 下一页 space 下一行 enter  q退出
history # 查看历史命令 -c 清空历史命令
adduser user # 添加用户
userdel user # 删除用户
passwd user # 修改用户密码
su user # 切换用户
sudo command # 以管理员身份执行命令
gzip file # 压缩文件(不能压缩目录) 将file压缩成file.gz
gunzip file # 解压文件
zip -r file.zip file # 压缩文件/目录 将file压缩成file.zip
unzip file.zip # 解压文件 -d 指定解压目录
du -h file # 查看文件大小 -h 以人类可读的方式显示文件大小 -s 显示总大小 -a 显示所有文件大小 -c 显示总大小
du -sh folder # 查看目录大小
df -h # 查看磁盘使用情况
lsblk # 查看磁盘分区情况 -a 显示所有分区 -l 显示主要信息 -p 显示完整路径 -t 显示分区类型 -f 显示文件系统类型
ps # 查看进程
# -a 列出带有终端的所有用户的进程
# -x 列出当前用户的所有进程，包括没有终端的进程
# -u 面向用户友好的显示风格
# -e 列出所有进程
# -f 显示完整格式的进程列表
ps aux | grep node  rrrrrr# 查看node进程
```
