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
