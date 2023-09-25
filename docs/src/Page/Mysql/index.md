# Mysql 指南

### 常用命令

```bash

mysql -u root -p   # 登录
show databases;   # 查看数据库
select version();   # 查看数据库版本
use database_name;   # 使用数据库
create database database_name;   # 创建数据库
show tables;   # 查看表
desc table_name;   # 查看表结构
select * from table_name;   # 查看表数据

```

### 查询语句

#### 简单查询

```bash
select field_name from tabel_name;  # 查询表中单个的字段
select field_name1,field_name2 from tabel_name;  # 查询表中多个的字段
select * from tabel_name;  # 查询表中所有的字段
select field_name as 别名 from tabel_name;  # 查询表中字段并起别名
select field_name newFieldName from tabel_name;  # 查询表中字段并起别名 省略as
select field_name 'new Field Name' from tabel_name;  # 查询表中字段并起别名 使用单引号(有空格)
select field_name * number from table_name;  # 查询表中字段并乘以一个数（参与数学运算）
```

#### 条件查询

```bash
select field_name from tabel_name where field_name = 'value';  # 查询表中字段并指定条件
select field_age from tabel_name where field_age > 19 and field_age < 30;  # and:并且 or:或者
select field_age from tabel_name where field_age between 19 and  30;  # and:并且 or:或者

select * from table_name whele sex = male and (age > 18 or age <23);  # and:并且 or:或者
# and 优先级比or高，想让or先执行可以使用括号来提高优先级
select field_age from tabel_name where field_age is null;  #查询字段为null
select field_age from tabel_name where field_age is not null;  #查询字段不为null

select * from tabel_name where field_age = 18 or field = 20;  # 查询字段在某个范围内

select * from table_name where field_age in (18,20);  # in操作符
select * from table_name where field_age not in (18,20);  # in操作符取反

select * from table_name whele field_name like %o%;  # like操作符 %:任意多个字符 查询名字有o的
select * from table_name whele field_name like %o;  #  查询名字以o结尾的
select * from table_name whele field_name like o%;  #  查询名字以o开头的
select * from table_name whele field_name like _o%;  #  _:任意单个字符 查询名字第二个字符是o的
select * from table_name whele field_name like _o_;  #  查询名字第二个字符是o的
select * from table_name whele filed_name like % /_% #  查询名字中包含_的

```

#### 排序查询

```bash
select * from table_name order by field_name;  # 升序
select * from table_name order by field_name desc;  # 降序（asc指定升序）
select * from table_name order by field_name1,field_name2;  # 多个字段排序
select * from table_name order by field_name1 asc,field_name2 asc; # 这意味着首先按 "field_name1" 进行排序，如果有多行具有相同的 "field_name1" 值，则再按 "field_name2" 进行排序
```

### 数据处理函数

#### 单行处理函数

数据处理函数又称为单行函数，是对一组数据进行操作，返回一个单一的结果
常见的数据处理函数有：lower，upper，substr，length，concat，round，floor，ceil，mod，now，rand，date_format，ifnull，if，case when then else end

```bash
select lower(field_name) from table_name;  # 将字段转换为小写
select upper(field_name) from table_name;  # 将字段转换为大写
select substr(field_name,1,2) from table_name;  # 截取字段
select length(field_name) from table_name;  # 获取字段长度
select concat(field_name1,field_name2) from table_name;  # 拼接字段
select round(field_name) from table_name;  # 四舍五入
select floor(field_name) from table_name;  # 向下取整
select ceil(field_name) from table_name;  # 向上取整
select mod(field_name) from table_name;  # 取余
select now() from table_name;  # 获取当前时间
select rand() from table_name;  # 获取随机数
select date_format(field_name,'%Y-%m-%d') from table_name;  # 格式化日期
select ifnull(field_name,'替换值') from table_name;  # 替换null值
select if(field_name1 > field_name2,'大于','小于') from table_name;  # if函数
select case field_name when 'value1' then '替换值1' when 'value2' then '替换值2' else '替换值3' end from table_name;  # case when then else end

select name,(salary + bonus) * 12 from employee;  # 计算年薪
# ifnull 函数判断为空
select name,(ifnull(salary,0) + ifnull(bonus,0)) * 12 from employee;  # 有null的情况下
```

#### 分组函数

count 基数,sum 求和,avg 平均值,max 最大值,min 最小值

```bash
select count(*) from table_name;  # 统计表中的记录数
select count(field_name) from table_name;  # 统计表中指定字段的记录数
select count(distinct field_name) from table_name;  # 统计表中指定字段的不重复记录数
select sum(field_name) from table_name;  # 求和
select avg(field_name) from table_name;  # 平均值
select max(field_name) from table_name;  # 最大值
select min(field_name) from table_name;  # 最小值
```

####

分组查询

```bash
 # 分组查询
select field_name1,field_name2 from table_name group by field_name1;
 # 按职位分组求和
select job sum(sal) from 'table_name' group by job;
 # 按职位分组求和 并且求和大于1000
select job sum(sal) from 'table_name' group by job having sum(sal) > 1000;
# 按部门分组求最高工资
select deptno,max(sal) from table_name group by deptno
# 按部门和职位分组求最高工资
select deptno,job,max(sal) from table_name group by deptno,job
# 按部门分组求最高工资 并且最高工资大于2000
select deptno,max(sal) from table_name group by deptno having max(sal) > 2000  #效率很低
# 先过滤再分组
select deptno,max(sal) from table_name where sal > 2000 group by deptno
```
