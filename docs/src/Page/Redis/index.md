# Redis

Redis 是一个开源（BSD 许可）内存数据结构存储，用作数据库、缓存、消息代理和流引擎。Redis 提供数据结构，例如字符串、哈希、列表、集、带有范围查询的排序集、位图、超日志日志、地理空间索引和流。Redis 具有内置复制、Lua 脚本、LRU 逐出、事务和不同级别的磁盘持久性，并通过 Redis Sentinel 和 Redis 集群的自动分区提供高可用性。

官方文档：[https://redis.io/documentation](https://redis.io/documentation)

**redis 的优点**

1. 性能极高 – Redis 能读的速度是 110000 次/s,写的速度是 81000 次/s 。
2. 丰富的数据类型 – Redis 支持二进制案例的 Strings, Lists, Hashes, Sets 及 Ordered Sets 数据类型操作。
3. 原子 – Redis 的所有操作都是原子性的，同时 Redis 还支持对几个操作全并后的原子性执行。
4. 丰富的特性 – Redis 还支持 publish/subscribe, 通知, key 过期等等特性。
5. Redis 支持数据的备份，即 master-slave 模式的数据备份。

**redis 的缺点**

1. Redis 是完全基于内存的，并且是单线程的，这个限制了它的并发性能。
2. Redis 的持久化也存在一定的问题，虽然可以通过异步的方式来解决，但是还是存在一定的风险。
3. Redis 的数据类型比较少，只有 String，List，Hash，Set，Sorted Set 这五种数据类型。
4. Redis 的集群方案比较复杂，Redis 集群方案在官方还没有成熟的方案，目前大家使用的都是第三方的集群方案。

<!-- @include:./dataType/index.md -->
<!-- @include:./dataType/index.md -->
