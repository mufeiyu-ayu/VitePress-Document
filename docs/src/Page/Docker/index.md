# Docker

Docker 是一个用于开发、发布和运行应用程序的开放平台。Docker 使您能够将应用程序与基础架构分离，以便快速交付软件。借助 Docker，您可以像管理应用程序一样管理基础架构。通过利用 Docker 的方法来交付、测试和部署代码，可以显著减少编写代码和在生产环境中运行代码之间的延迟。

**Docker 的基本组成包括：** Image 镜像、Container 容器、Registry 仓库。

## 镜像

操作系统分为 内核 和 用户空间。对于 Linux 而言，内核启动后，会挂载 root 文件系统为其提供用户空间支持。而 Docker 镜像（Image），就相当于是一个 root 文件系统。比如官方镜像 ubuntu:18.04 就包含了完整的一套 Ubuntu 18.04 最小系统的 root 文件系统。

Docker 镜像 是一个特殊的文件系统，除了提供容器运行时所需的程序、库、资源、配置等文件外，还包含了一些为运行时准备的一些配置参数（如匿名卷、环境变量、用户等）。镜像 不包含 任何动态数据，其内容在构建之后也不会被改变。

## 容器

镜像（Image）和容器（Container）的关系，就像是面向对象程序设计中的 类 和 实例 一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等。

容器的实质是进程，但与直接在宿主执行的进程不同，容器进程运行于属于自己的独立的 命名空间。因此容器可以拥有自己的 root 文件系统、自己的网络配置、自己的进程空间，甚至自己的用户 ID 空间。容器内的进程是运行在一个隔离的环境里，使用起来，就好像是在一个独立于宿主的系统下操作一样。这种特性使得容器封装的应用比直接在宿主运行更加安全。也因为这种隔离的特性，很多人初学 Docker 时常常会混淆容器和虚拟机。

前面讲过镜像使用的是分层存储，容器也是如此。每一个容器运行时，是以镜像为基础层，在其上创建一个当前容器的存储层，我们可以称这个为容器运行时读写而准备的存储层为 容器存储层。

容器存储层的生存周期和容器一样，容器消亡时，容器存储层也随之消亡。因此，任何保存于容器存储层的信息都会随容器删除而丢失。

按照 Docker 最佳实践的要求，容器不应该向其存储层内写入任何数据，容器存储层要保持无状态化。所有的文件写入操作，都应该使用 数据卷（Volume）、或者 绑定宿主目录，在这些位置的读写会跳过容器存储层，直接对宿主（或网络存储）发生读写，其性能和稳定性更高。

数据卷的生存周期独立于容器，容器消亡，数据卷不会消亡。因此，使用数据卷后，容器删除或者重新运行之后，数据却不会丢失。

## 仓库

镜像构建完成后，可以很容易的在当前宿主机上运行，但是，如果需要在其它服务器上使用这个镜像，我们就需要一个集中的存储、分发镜像的服务，Docker Registry 就是这样的服务。

一个 Docker Registry 中可以包含多个 仓库（Repository）；每个仓库可以包含多个 标签（Tag）；每个标签对应一个镜像。

通常，一个仓库会包含同一个软件不同版本的镜像，而标签就常用于对应该软件的各个版本。我们可以通过 <仓库名>:<标签> 的格式来指定具体是这个软件哪个版本的镜像。如果不给出标签，将以 latest 作为默认标签。

以 Ubuntu 镜像 为例，ubuntu 是仓库的名字，其内包含有不同的版本标签，如，16.04, 18.04。我们可以通过 ubuntu:16.04，或者 ubuntu:18.04 来具体指定所需哪个版本的镜像。如果忽略了标签，比如 ubuntu，那将视为 ubuntu:latest。

仓库名经常以 两段式路径 形式出现，比如 jwilder/nginx-proxy，前者往往意味着 Docker Registry 多用户环境下的用户名，后者则往往是对应的软件名。但这并非绝对，取决于所使用的具体 Docker Registry 的软件或服务

Docker Registry 公开服务是开放给用户使用、允许用户管理镜像的 Registry 服务。一般这类公开服务允许用户免费上传、下载公开的镜像，并可能提供收费服务供用户管理私有镜像。

最常使用的 Registry 公开服务是官方的 Docker Hub，这也是默认的 Registry，并拥有大量的高质量的 官方镜像。除此以外，还有 Red Hat 的 Quay.io；Google 的 Google Container Registry，Kubernetes 的镜像使用的就是这个服务；代码托管平台 GitHub 推出的 ghcr.io。

由于某些原因，在国内访问这些服务可能会比较慢。国内的一些云服务商提供了针对 Docker Hub 的镜像服务（Registry Mirror），这些镜像服务被称为 加速器。常见的有 阿里云加速器、DaoCloud 加速器 等。使用加速器会直接从国内的地址下载 Docker Hub 的镜像，比直接从 Docker Hub 下载速度会提高很多。在 安装 Docker 一节中有详细的配置方法。

国内也有一些云服务商提供类似于 Docker Hub 的公开服务。比如 网易云镜像服务、DaoCloud 镜像市场、阿里云镜像库 等。

除了使用公开服务外，用户还可以在本地搭建私有 Docker Registry。Docker 官方提供了 Docker Registry 镜像，可以直接使用做为私有 Registry 服务。在 私有仓库 一节中，会有进一步的搭建私有 Registry 服务的讲解。

开源的 Docker Registry 镜像只提供了 Docker Registry API 的服务端实现，足以支持 docker 命令，不影响使用。但不包含图形界面，以及镜像维护、用户管理、访问控制等高级功能。

除了官方的 Docker Registry 外，还有第三方软件实现了 Docker Registry API，甚至提供了用户界面以及一些高级功能。比如，Harbor 和 Sonatype Nexus。

## 镜像命令

```bash
docker images # 列出本地主机上的镜像
docker search [imagesName] # 从 Docker Hub 查找镜像
docker pull [imagesName]:[tag] # 从 Docker Hub 下载镜像 (默认 latest最新版本, 也可以指定版本)
docker system df # 查看镜像占用空间
docker rmi [imagesName]:[tag] # 删除镜像
docker rmi -f [imagesName]:[tag] # 强制删除镜像
```

## 容器命令

```bash
docker run -it [imagesName]:[tag] /bin/bash # 运行镜像并进入容器
docker run -it --name=containerName [imagesName]:[tag] /bin/bash # 运行镜像并进入容器并指定容器名
docker run -it --name=containerName -p 8080:80 [imagesName]:[tag] /bin/bash # 运行镜像并进入容器并指定容器名并指定端口映射
docker run -d redis # 后台运行容器
docker ps  # 查看正在运行的容器xit # 退出容器并关闭容器
ctrl + p + q # 退出容器不关闭容器
docker start containerName  # 启动容器

docker stop containerName  # 停止容器
docker kill containerName  # 强制停止容器
docker restart containerName  # 重启容器
docker rm containerName  # 删除容器
docker rm -f containerName  # 强制删除容器

docker logs containerName  # 查看容器日志
docker exec -it containerName /bin/bash  # 重新进入容器
# 查看容器的状态
docker inspect containerName | grep Status
docker cp containerName|containerID:/opt/file.txt /opt/file.txt  # 从容器拷贝文件到宿主机
docker cp /opt/file.txt containerName|containerID:/opt/file.txt  # 从宿主机拷贝文件到容器

docker export containerName|containerID > /opt/containerName.tar  # 导出容器
docker import /opt/containerName.tar containerName  # 导入容器
cat /opt/containerName.tar | docker import - containerName  # 导入容器
```

## 数据卷

数据卷（Volume）是一个可供一个或多个容器使用的特殊目录，它绕过 UFS，可以提供很多有用的特性：

1. 数据卷可以在容器之间共享或重用数据
2. 卷中的更改可以直接实时生效，
3. 数据卷中的更改不会包含在镜像的更新中
4. 数据卷的生命周期一直持续到没有容器使用为止

```bash
docker run -d -it -p 6379:6379 --privileged=true -v /主机目录:/容器内目录 --name=containerName [imagesName]:[tag] /bin/bash # 挂载宿主机目录到容器(数据卷持久化存储)
docker inspect containerName|containerID  # 查看容器信息

```
