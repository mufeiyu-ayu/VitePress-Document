## 类型体操练习

#### 1. 给已有对象添加类型

```typescript
const page = {num:number} // 给对象添加size属性且不报错
type Addatr = typeof page & size:number
(page as Addatr).size = 33
```

#### 2.对象所有属性可选

```typescript
type $Partial<T> = {
  [Key in keyof T]? = T[Key]
}
type C = $Partial<{a:string,b:number}>

```

#### 3.对象所有属性只读

```typescript
type $ReadOnly<T> = {
  readOnly [Key in keyof T]:T[Key]
}
type readOnlyObj = $ReadOnly<{a:123,b:234}>
//eg:
let obj:readOnlyobj = {
  a:123,
  b:234
}
```

#### 4.对象属性只读且可选

```typescript
type ReadonluAndchooese = $ReadOnly<Partial<{ a: string; b: boolean }>>;
```

#### 5.infer

```typescript
type ParamType<T> = T extends (param: infer P) => any ? P : T;
```

在这个条件语句 T extends (param: infer P) => any ? P : T 中，infer P 表示待推断的函数参数。<br />整句表示为：如果 T 能赋值给 (param: infer P) => any，则结果是 (param: infer P) => any 类型中的参数 P，否则返回为 T。

```typescript
interface User {
  name: string;
  age: number;
}

type Func = (user: User) => void;

type Param = ParamType<Func>; // Param = User
type AA = ParamType<string>; // string
```

#### 5.从对象中取一些需要的属性组成联合类型

```typescript
type $Pick<T, K extends keyof T> = { [Key in K]: K[T] };
type obj = $Pick<{ a: 123; b: 234; c: 346 }, "a">; // {a:123}
```

#### 6.Omit&lt;T,K&gt;从类型 T 中剔除 K 的所有属性

```typescript
type MyOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type Obj = {
  name: "jack";
  age: 22;
};
type TestOmit = MyOmit<Obj, "name">; // {name:'jack'} //
```

#### 7.Include

```typescript
// type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`
// 先将数组转化为一个value为true的对象，然后再判断属性是否为有这个为true的属性
type MyIncludes<T, K extends string> = {
  [P in T[number]]: true;
}[A] extends true
  ? true
  : false;
```

//注意 <br />**T[number] 用来获取数组元素类型的集合(转为数组的联合类型)**<br />**T[length] 用来获取数组元素类型集合的长度**

#### 8.Concat

```typescript
type Concat<T extends readonly any[], U> = U extends any[]
  ? [...T, ...U]
  : [...T, U];
const arr = [1, 2, 3, 4] as const;
type ConcatArr = Concat<typeof arr, 5>; // 1,2,3,4,5
```

**...T 可以枚举数组类型**

#### 9.深度 Readonly

```typescript
const obj = {
  name:'ayu',
  age:22,
  friends:{
    f1:{
      name:'tom',
      age:33
    },
    f2:{
      name:'jack',
      age:44
    }
}
type IsObject<T> = keyof T extends never ? false : true
type DeepReadonly<T>={
  readonly [ P in keyof T ]:IsObject<T[ p ]> extends true ? DeepReadonly<T[ P ]> : T[ P ]
}
```

#### 10.元组转联合类型

```typescript
type Arr = [1, 2, 3, 4];
type TupleToUnion<T> = T[number];
```

#### 11.获取数组最后一个元素的类型

```typescript
// 最后一个元素
type LastEle<T extends any[]> = T extends [...infer A, infer B] ? B : never;

type A1 = [1, 2, 3, 4];
type ReultA = LastEle<A1>;
```

#### 12.Pop

实现一个通用 Pop&lt;T&gt; 接受一个数组 T 并返回一个没有最后一个元素的数组

```typescript
type Pop<T extends any[]> = T extends [...infer A, infer B] ? A : never;
```

#### 13.去除字符串空格

```typescript
type TWiteSpace = " ";
type TrimLeft<T extends string> = T extends `${TWiteSpace}${infer B}`
  ? TrimLeft<B>
  : T;
type FilterStrStartTrim = TrimLeft<" hello world   ">; // 'hello world   '
```

```typescript
type TWiteSpace = ' '
type TrimLeft<T extends string> = T extends `${TWiteSpace}${infer B}` ?  TrimLeft<B> : S
type TrimRight<T extends string> = T extends `${infer A}${TWiteSpace}` ? TrimRight<A> : S
type FilterStrTrim = <TrimLeft<TrimRight<'   hello world    '>>>
```

#### 14.Replace

```typescript
// type replaced = Replace<'types are fun!', 'fun', 'awesome'> // expected to be 'types are awesome!'
type Replace<
  S extends string,
  From extends string,
  To extends string
> = From extends ""
  ? S
  : S extends `${infer L}${From}${infer R}`
  ? `${L}${To}${R}`
  : S;
```

#### 15.ReplaceAll

```typescript
type ReplaceAll<
  S extends string,
  From extends string,
  To extends string
> = From extends ""
  ? S
  : S extends `${infer L}${From}${infer R}`
  ? `ReplaceAll<L,From,To>${To}${ReplaceAll<R, From, To>}`
  : S;
// 分别将左右两边的进行机递归处理
```

#### 16。分布式条件类型的理解

**会把 extends 左边的类型进行循环处理，然后重新组成联合类型**

```typescript
type D<A, B = A> = A extends A ? { a: A; b: B } : never;
type R = D<"a" | "b" | "c">;
/*
type R = {
    a: "a";
    b: "a" | "b" | "c";
} | {
    a: "b";
    b: "a" | "b" | "c";
} | {
    a: "c";
    b: "a" | "b" | "c";
}
*/
```

#### 17.判断类型是否为联合类型

```typescript
type IsUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : false;
type CC = ISUnion<"a" | "b">; // true
type DD = IsUnion<"a">; // false
```

给类型加数组是为了防止它循环
