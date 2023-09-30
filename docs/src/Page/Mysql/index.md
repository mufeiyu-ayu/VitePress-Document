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

### DQL 查询语句

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

select * from tabel_name where field_age = 18 or field = 20;  # 查询字段为18或者20

select * from table_name where field_age in (18,20);  # in操作符 （不是区间，是指18或20）
select * from table_name where field_age not in (18,20);  # in操作符取反

select * from table_name whele field_name like '%o%';  # like操作符 %:任意多个字符 查询名字有o的
select * from table_name whele field_name like '%o';  #  查询名字以o结尾的
select * from table_name whele field_name like 'o%';  #  查询名字以o开头的
select * from table_name whele field_name like '_o%';  #  _:任意单个字符 查询名字第二个字符是o的
select * from table_name whele field_name like '_o_';  #  查询名字第二个字符是o的
select * from table_name whele filed_name like '% /_%'; #  查询名字中包含_的

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
常见的数据处理函数有：lower，upper，substr，length，concat，round，floor，ceil，mod，now，rand，date_format，ifnull，if ，case when then else end

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

### 连接查询

从一张表中单独查询称为单表查询,从多张表中查询称为多表查询也叫连接查询

````bash

select name,cname from table_name1,table_name2;  # 笛卡尔积
#  内部连接  等值连接
#  查询效率很慢， name,以及cname不知道是哪个表的字段
select name,cname
from table_name1,table_name2
where table_name1.id = table_name2.id;  # 内连接
# 优化写法并给表起别名 92版本之前 语意不清晰，汇总后表的数据如果还要过滤则需要使用and 或者having
select a.name,b.name from table_name1 a,table_name2 b where a.id = b.id;  # 内连接

# 98版本之后 使用inner明确是内连接
select a.name b.name
from worker a
inner join jiajia b
on a.id = b.id
where a.salary>5000;  # 内连接

```bash
# 内部连接 非等值连接
# 查询员工的工资等级 并且统计工资等级大于3的信息，并且按照等级升序排列
select a.name,b.name
from worker a
inner join jiajia2 b
on a.salary between b.losal and b.hisal # 范围
where b.grade > 3
order by b.grade;
````

```bash
# 内部连接 自连接
# 在一张表中查出员工以及老板以及他们的编号 （员工和老板在一张表，员工的老板编号是老板编号）
# 思路:把一张表看成2张表
SELECT
    a.ename as '员工',
    a.mgr,
    b.ename as '老板',
    b.empno
from emp a
    INNER JOIN emp b on a.mgr = b.empno

```

```bash
#外部连接
# 根据员工的部门编号查询员工的信息以及部门的信息(部门表中存有null)
select e.ename,d.dname
from emp e
right join dept d
on e.deptno = d.deptno;  # 右外连接 也可以左连接
#right表示将右边的表作为主表，主表的信息都要，次表为emp

# 根据员工上级编号查询员工的信息以及上级的信息(员工表中存有null)并且将带有null的员工信息也查询出来、
select a.ename as '员工',b.ename as '上级'
from emp a
left join emp b
on a.mgr = b.empno;  # 左外连接(主表要确定清楚！！！)
```

```bash
# 多张表连接
# 要求查询员工姓名，部门名称，工资，工资等级，老板信息 其中员工的老板编号为null的也要显示出来
select a.ename as '员工',d.dname as '部门',a.sal as '工资',c.grade as '工资等级',b.ename as '老板'
from emp a
left join emp b
on a.mgr = b.empno
left join salgrade c
on a.sal between c.losal and c.hisal
left join dept d
on a.deptno = d.deptno;
```

### 子查询

```bash
select
    ...(select)
    from
    ...(select)
    where
    ...(select)
```

```bash
# where 中的子查询
select ename,sal from emp where sal
> (select min(sal) from emp)

# from中的子查询
# 找出员工单位，平均薪资以及平均薪资的薪资等级

# 思路 先找 员工信息以及平均薪资
select job,avg(sal) from emp group by job; #把它看成一张表

# 再找出平均薪资的薪资等级
select t1.*,t2.grade
from (select job,avg(sal) avgvgsal from emp group by job) t1
join salgrade t2 on t1.avgvgsal between t2.losal and t2.hisal;

# unione 相加查询结果
select ename,job from emp where job in('MANAGER','SALESMAN')

select eanme,job from emp where job = 'manager'
unione
select eanme,job from emp where job = 'salesman'


# limit 限制查询结果数量
# limit resultlength
# limit startNum,resultlength
# limit 在order by之后
select * from emp limit 3; # 查询前三条
select * from emp limit 3,3; # 查询第四条开始的三条


# limit 分页

# 用户发起请求包含字段 1：当前页码，字段 2：每页显示的条数，则对应的 sql 语句为

select * from table_name limit (page - 1) * pageSize,pageSize;

```

**DQL 语句总结**
select ...
from ...
where ...
group by ...
having ...
order by ...
limit ...

**执行顺序**
from -> where -> group by -> having -> select -> order by -> limit

## DDL

DDL 包括 creat ，drop ， alter

### 建表

````bash
    create table table_name(
        field_name1 field_type1,
        field_name2 field_type2,
        field_name3 field_type3,
        ...
        field_nameN field_typeN
    );
    ```
````

### 数据类型

| type     | des                                             |
| -------- | ----------------------------------------------- |
| varchar  | 可变长度字符串，动态分配空间                    |
| char     | 定长字符串，固定分配空间                        |
| int      | 数字的整数型                                    |
| bigint   | 数字的长整形                                    |
| flot     | 单精度浮点型                                    |
| double   | 双精度浮点型                                    |
| date     | 短日期类型 YYYY-MM-DD                           |
| time     | 存储时间 HH:MM:SS                               |
| datetime | 长日期类型 YYYY-MM-DD HH:MM:SS                  |
| clob     | 字符大对象 最多 4G 的字符串比如存储文章         |
| text     | 用于存储大量的文本数据，最大长度为 65535 个字符 |
| blob     | 图片，声音，视频，等流媒体数据                  |
| json     | json 格式数据                                   |

**删除表**

```bash
# 如果表存在则删除，直接删除如果表不存在则会报错
drop table if exists table_name;
```

## DML

DML 包括 insert ，update ，delete

```bash
# insert 插入数据
insert into table_name(field_name1,field_name2,field_name3) values(value1,value2,value3);
insert into table_name values(value1,value2,value3); # 表示插入所有字段
# 插入多条数据
inser into table_name values
(value1,...),
(value1,...),
(value1,...),
(value1,...),
(value1,...)

```

```bash
# update 更新数据
# 没有条件会更新所有数据
 update table_name set field_name1 = value1,field_name2 = value2 where 条件;

```

```bash
# delete 删除数据
# 没有条件会删除所有数据
delete from table_name where 条件;

# 这种删除效率比较慢，虽然数据被删除，但是表的空间没有被释放，
# 但如果删除后后悔了可以使用rollback回滚得到数据
truncate table_name; # 删除表中所有数据并且释放表空间 ，还不能回滚
```

## 约束

1. 非空约束 not null 约束的字段不能为 null
2. 唯一约束 unique 约束的字段不能重复 但是可以为 null
3. 主键约束 primary key
4. 外键约束 foreign key
5. 检查约束 check
6. 默认约束 default

当约束没有在列的后面称为表级约束，当约束在列的后面称为列级约束<br/>
使用表级约束的情况:多个字段需要联合约束

**当一个字段同时被 not null 以及 unique 约束时，字段成为主键约束**

### 主键约束

主键值是每一行记录的唯一标识，类似于每个人的身份证号码，任何一张表都应该有主键，没有主键，表无效！！

主键特征：unique + not null

```bash
create table table_name (
    id int, # primary key 一个字段作主键为单一主键
    name vachar(255),
    primary key(id,name) # 多个字段作为主键为联合主键
)
# 在实际开发不建议使用联合主键， 单一主键即可
# 一张表只能有一个主键

# 主键自增
create table table_name (
    id int primary key auto_increment,
    name vachar(255)
)
# 下面就不需要指定id的值了
insert into table_name(name) values('张三');
insert into table_name(name) values('张三');
insert into table_name(name) values('张三')
```

### 外键约束

```bash
# 先创建父表
create table t_father (
    classno init primary key,
    classname varchar(255)
)
# 再创建子表
create table t_son  if not exists (  #不存在就创建
    id int primary key auto_increment,
    name varchar(255),
    classno int,
    foreign key(classno) references t_father(classno)
    # classno 是子表的字段，t_father(classno) 是父表的字段
)
```

## 事务

事务就是一个完整的业务逻辑，是一个最小的工作单元，不可再分
只有 dml 语句才有事务一说，数据一旦涉及到增，删，改，就一定要考虑安全问题，数据安全第一位

**提交事务**
清空事务日志，释放事务占用的资源，将数据全部持久化到数据库表中
提交事务标志着，事务的结束，并且是一种全部成功的结束

**回滚事务**
将之前所有的 DML 操作（update,insert,delete）全部撤销，并且清空事务性活动的日志文件，
回滚事务标志着，事务的结束，并且是一种全部失败的结束

**如何提交事务**

提交事务 commit
回滚事务 rollback

事务对应的英语单词是 transaction

mysql 的事务默认是自动提交的，也就是说每执行一条 dml 语句就会自动提交一次事务

关闭 mysql 自动提交机制

```bash
start transaction; # 开启事务
```

然后我们就可以回滚了
