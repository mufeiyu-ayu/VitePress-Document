## 常用命令

### Redis key

1. DEL key [key ...] 删除给定的一个或多个 key 。不存在的 key 会被忽略。
2. DUMP key 序列化给定 key ，并返回被序列化的值。
3. EXISTS key 检查给定 key 是否存在。
4. EXPIRE key seconds 为给定 key 设置过期时间。
5. EXPIREAT key timestamp 为给定 key 设置过期时间。timestamp 是 UNIX 时间戳。
6. PEXPIRE key milliseconds 为给定 key 设置过期时间。timestamp 是 UNIX 时间戳。
7. PEXPIREAT key milliseconds-timestamp 为给定 key 设置过期时间。timestamp 是 UNIX 时间戳。
8. KEYS pattern 查找所有符合给定模式( pattern )的 key 。
9. MOVE key db 将当前数据库的 key 移动到给定的数据库 db 当中。
10. PERSIST key 移除给定 key 的过期时间，使得 key 永不过期。
11. PTTL key 以毫秒为单位返回 key 的剩余的过期时间。
12. TTL key 以秒为单位，返回给定 key 的剩余生存时间(TTL, time to live)。
13. RANDOMKEY 从当前数据库中随机返回一个 key 。
14. RENAME key newkey 修改 key 的名称
15. RENAMENX key newkey 仅当 newkey 不存在时，将 key 改名为 newkey 。
16. TYPE key 返回 key 所储存的值的类型。
17. FLUSHALL 删除所有数据库的所有 key 。(危险操作)
18. FLUSHDB 删除当前数据库的所有 key 。

### String

```shell
set k1  value [NX|XX] [GET] [EX seconds|PX milliseconds|EXAT unix-time-seconds|PXAT unix-time
#  NX: 当key不存在时，才会设置
#  XX: 当key存在时，才会设置
#  GET: 返回key的值
#  EX seconds: 设置过期时间，单位秒
#  PX milliseconds: 设置过期时间，单位毫秒
#  EXAT unix-time-seconds: 设置过期时间，单位秒
#  PXAT unix-time-milliseconds: 设置过期时间，单位毫秒
mset k1 v1 k2 v2 k3 v3 # 批量设置
mget k1 k2 k3 # 批量获取
setnx k1 v1 # 当key不存在时，才会设置
set k1 ex 10 # 设置过期时间，单位秒
incr k1 # 自增1
incrby k1 10 # 自增10
decr k1 # 自减1
decrby k1 10 # 自减10
getrange k1 start end  # 获取指定范围的字符串
setrange k1 offset value # 从指定偏移量开始，替换字符串
```

### List

```shell
lpush k1 v1 v2 v3 # 从左边插入
rpush k1 v1 v2 v3 # 从右边插入
lrange k1 start end # 获取指定范围的元素
lpop k1 # 从左边弹出
rpop k1 # 从右边弹出
lindex k1 index # 获取指定索引的元素
linsert k1 before|after pivot value # 在指定元素前或后插入元素
llen k1 # 获取长度
lrem k1 count value # 删除指定数量的某个元素
lset k1 index value # 修改指定索引的元素
ltrim k1 start end # 截取指定范围的元素
lmove source destination LEFT|RIGHT LEFT|RIGHT # 移动元素
# source: 源列表
# destination: 目标列表
# LEFT|RIGHT: 从源列表左边或右边移出
# LEFT|RIGHT: 移入到目标列表到左边或右边
lpushx k1 v1 # 当key存在时，才会插入
rpushx k1 v1 # 当key存在时，才会插入
lpos k1 v1 [RANK rank] [COUNT num] [MAXLEN len] # 查找元素 返回元素的索引
# RANK rank: 从指定索引开始查找(指的是假如有多个相同的元素，从第几个开始查找)
# COUNT num: 查找多少个元素
# MAXLEN len: 查找多少个元素
```

### Hash

```shell
hset k1 f1 v1 f2 v2 # 设置hash
hget k1 f1 # 获取hash
hmset k1 f1 v1 f2 v2 # 批量设置hash
hmget k1 f1 f2 # 批量获取hash
hgetall k1 # 获取所有hash
hdel k1 f1 f2 # 删除hash
hexists k1 f1 # 判断hash是否存在
hkeys k1 # 获取所有的key
hvals k1 # 获取所有的value
hlen k1 # 获取长度
hincrby k1 f1 10 # 自增10
hincrbyfloat k1 f1 10.5 # 自增10.5
hstrlen k1 f1 # 获取字符串长度
hkeys k1 # 获取所有的key
hrandfield k1 [count [withvalues]] # 随机获取count个元素
# withvalues: 是否获取value
hsetnx k1 f1 v1 # 当key不存在时，才会设置
hscan k1 cursor [MATCH pattern] [COUNT count] # 模糊查询
hstrlen k1 f1 # 获取某字段的value长度
hvals k1 # 获取所有的value
```

### Set

```shell
sadd k1 v1 v2 v3 # 添加元素
scard k1 # 获取列表长度
sdiff k1 k2 # 获取差集(k1中有，k2中没有)
sdiffstore newSet k2 k3 # 获取差集(k1中有，k2中没有)，并存储到newSet中
sinter k1 k2 # 获取交集(k1和k2都有，如果其中一个不存在键，则返回空)
sintercard numkeys k1 [key....] [limit count] #获取交集的数量，并且可截取
sinterstore newSet k1 k2 # 获取交集(k1和k2都有，如果其中一个不存在键，则返回空)，并存储到newSet中
sismember k1 v1 # 判断元素是否存在
smismember k1 v1 v2 # 判断多个元素是否存在
smembers k1 # 获取所有元素的列表
smove source destination member # 将源集合中的元素移动到目标集合中
spop k1 [count] # 随机弹出元素
srandmember k1 [count] # 随机获取元素
srem k1 member [member...] # 删除元素
sunion k1 k2 # 获取并集
sunionstore newSet k1 k2 # 获取并集，并存储到newSet中
```

### Sorted Set

```shell
zcard key # 获取长度
zcount key min max # 获取指定范围的元素数量
zdiff numkeys key [key...] [WITHSCORES] # 获取差集
zdiffstore destination numkeys key [key...]  # 获取差集，并存储到destination中
zincrby key increment member # 自增（可为负值递减)
zinter numkeys key [key...] [WEIGHTS weight [weight...]] [AGGREGATE SUM|MIN|MAX] # 获取交集
zintercard numkeys key [key...] [limit Limit] # 获取交集的数量，并且可截取
zinterstore destination numkeys key [key...] [WEIGHTS weight [weight...]] [AGGREGATE SUM|MIN|MAX] # 获取交集，并存储到destination中
zlexcount key min max # 获取指定范围的元素数量 - +
zmpop key [key...] <min | max> [count] # 弹出指定数量的元素 min: 从小到大 max: 从大到小
zmscore key member [member...] # 获取指定元素的分数
zpopmax key [count] # 弹出指定数量的元素，从大到小
zpopmin key [count] # 弹出指定数量的元素，从小到大
zrandmember key [count] # 随机获取指定数量的元素
ZRANGE key start stop [BYSCORE | BYLEX] [REV] [LIMIT offset count]
  [WITHSCORES]
# 获取指定范围的元素
zrangebylex key min max [LIMIT offset count]
# 获取指定范围的元素 - +
zrangebyscore key min max [WITHSCORES] [LIMIT offset count] # 获取指定范围的元素
zrank key member # 获取指定元素的排名索引
zrem key member [member...] # 删除指定元素
zremscore key min max # 删除指定范围的元素
```

### Bitmap

位图不是实际的数据类型，而是在 String 类型上定义的一组面向位的操作，该类型被视为位向量。由于字符串是二进制安全 blob，其最大长度为 512 MB，因此它们适合设置多达 2^32 个不同的位。

```shell
setbit key offset value # 设置指定偏移量的值
getbit key offset # 获取指定偏移量的位值
bitpos key bit [start] [end] # 获取指定范围的第一个位值

```
