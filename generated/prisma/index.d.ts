
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Course
 * 
 */
export type Course = $Result.DefaultSelection<Prisma.$CoursePayload>
/**
 * Model CourseContent
 * 
 */
export type CourseContent = $Result.DefaultSelection<Prisma.$CourseContentPayload>
/**
 * Model Enrollment
 * 
 */
export type Enrollment = $Result.DefaultSelection<Prisma.$EnrollmentPayload>
/**
 * Model Quiz
 * 
 */
export type Quiz = $Result.DefaultSelection<Prisma.$QuizPayload>
/**
 * Model QuizQuestion
 * 
 */
export type QuizQuestion = $Result.DefaultSelection<Prisma.$QuizQuestionPayload>
/**
 * Model QuizAttempt
 * 
 */
export type QuizAttempt = $Result.DefaultSelection<Prisma.$QuizAttemptPayload>
/**
 * Model Progress
 * 
 */
export type Progress = $Result.DefaultSelection<Prisma.$ProgressPayload>
/**
 * Model Feedback
 * 
 */
export type Feedback = $Result.DefaultSelection<Prisma.$FeedbackPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  STUDENT: 'STUDENT',
  TEACHER: 'TEACHER',
  ADMIN: 'ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]


export const ContentType: {
  VIDEO: 'VIDEO',
  NOTE: 'NOTE'
};

export type ContentType = (typeof ContentType)[keyof typeof ContentType]


export const QuizType: {
  MID: 'MID',
  FINAL: 'FINAL'
};

export type QuizType = (typeof QuizType)[keyof typeof QuizType]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type ContentType = $Enums.ContentType

export const ContentType: typeof $Enums.ContentType

export type QuizType = $Enums.QuizType

export const QuizType: typeof $Enums.QuizType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Courses
 * const courses = await prisma.course.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Courses
   * const courses = await prisma.course.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.course`: Exposes CRUD operations for the **Course** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Courses
    * const courses = await prisma.course.findMany()
    * ```
    */
  get course(): Prisma.CourseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.courseContent`: Exposes CRUD operations for the **CourseContent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CourseContents
    * const courseContents = await prisma.courseContent.findMany()
    * ```
    */
  get courseContent(): Prisma.CourseContentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.enrollment`: Exposes CRUD operations for the **Enrollment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Enrollments
    * const enrollments = await prisma.enrollment.findMany()
    * ```
    */
  get enrollment(): Prisma.EnrollmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.quiz`: Exposes CRUD operations for the **Quiz** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Quizzes
    * const quizzes = await prisma.quiz.findMany()
    * ```
    */
  get quiz(): Prisma.QuizDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.quizQuestion`: Exposes CRUD operations for the **QuizQuestion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QuizQuestions
    * const quizQuestions = await prisma.quizQuestion.findMany()
    * ```
    */
  get quizQuestion(): Prisma.QuizQuestionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.quizAttempt`: Exposes CRUD operations for the **QuizAttempt** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QuizAttempts
    * const quizAttempts = await prisma.quizAttempt.findMany()
    * ```
    */
  get quizAttempt(): Prisma.QuizAttemptDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.progress`: Exposes CRUD operations for the **Progress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Progresses
    * const progresses = await prisma.progress.findMany()
    * ```
    */
  get progress(): Prisma.ProgressDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.feedback`: Exposes CRUD operations for the **Feedback** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Feedbacks
    * const feedbacks = await prisma.feedback.findMany()
    * ```
    */
  get feedback(): Prisma.FeedbackDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.14.0
   * Query Engine version: 717184b7b35ea05dfa71a3236b7af656013e1e49
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Course: 'Course',
    CourseContent: 'CourseContent',
    Enrollment: 'Enrollment',
    Quiz: 'Quiz',
    QuizQuestion: 'QuizQuestion',
    QuizAttempt: 'QuizAttempt',
    Progress: 'Progress',
    Feedback: 'Feedback',
    User: 'User'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "course" | "courseContent" | "enrollment" | "quiz" | "quizQuestion" | "quizAttempt" | "progress" | "feedback" | "user"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Course: {
        payload: Prisma.$CoursePayload<ExtArgs>
        fields: Prisma.CourseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CourseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CourseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          findFirst: {
            args: Prisma.CourseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CourseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          findMany: {
            args: Prisma.CourseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          create: {
            args: Prisma.CourseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          createMany: {
            args: Prisma.CourseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CourseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          delete: {
            args: Prisma.CourseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          update: {
            args: Prisma.CourseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          deleteMany: {
            args: Prisma.CourseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CourseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CourseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          upsert: {
            args: Prisma.CourseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          aggregate: {
            args: Prisma.CourseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCourse>
          }
          groupBy: {
            args: Prisma.CourseGroupByArgs<ExtArgs>
            result: $Utils.Optional<CourseGroupByOutputType>[]
          }
          count: {
            args: Prisma.CourseCountArgs<ExtArgs>
            result: $Utils.Optional<CourseCountAggregateOutputType> | number
          }
        }
      }
      CourseContent: {
        payload: Prisma.$CourseContentPayload<ExtArgs>
        fields: Prisma.CourseContentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CourseContentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseContentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CourseContentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseContentPayload>
          }
          findFirst: {
            args: Prisma.CourseContentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseContentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CourseContentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseContentPayload>
          }
          findMany: {
            args: Prisma.CourseContentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseContentPayload>[]
          }
          create: {
            args: Prisma.CourseContentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseContentPayload>
          }
          createMany: {
            args: Prisma.CourseContentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CourseContentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseContentPayload>[]
          }
          delete: {
            args: Prisma.CourseContentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseContentPayload>
          }
          update: {
            args: Prisma.CourseContentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseContentPayload>
          }
          deleteMany: {
            args: Prisma.CourseContentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CourseContentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CourseContentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseContentPayload>[]
          }
          upsert: {
            args: Prisma.CourseContentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseContentPayload>
          }
          aggregate: {
            args: Prisma.CourseContentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCourseContent>
          }
          groupBy: {
            args: Prisma.CourseContentGroupByArgs<ExtArgs>
            result: $Utils.Optional<CourseContentGroupByOutputType>[]
          }
          count: {
            args: Prisma.CourseContentCountArgs<ExtArgs>
            result: $Utils.Optional<CourseContentCountAggregateOutputType> | number
          }
        }
      }
      Enrollment: {
        payload: Prisma.$EnrollmentPayload<ExtArgs>
        fields: Prisma.EnrollmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EnrollmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EnrollmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          findFirst: {
            args: Prisma.EnrollmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EnrollmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          findMany: {
            args: Prisma.EnrollmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>[]
          }
          create: {
            args: Prisma.EnrollmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          createMany: {
            args: Prisma.EnrollmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EnrollmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>[]
          }
          delete: {
            args: Prisma.EnrollmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          update: {
            args: Prisma.EnrollmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          deleteMany: {
            args: Prisma.EnrollmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EnrollmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EnrollmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>[]
          }
          upsert: {
            args: Prisma.EnrollmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          aggregate: {
            args: Prisma.EnrollmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEnrollment>
          }
          groupBy: {
            args: Prisma.EnrollmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<EnrollmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.EnrollmentCountArgs<ExtArgs>
            result: $Utils.Optional<EnrollmentCountAggregateOutputType> | number
          }
        }
      }
      Quiz: {
        payload: Prisma.$QuizPayload<ExtArgs>
        fields: Prisma.QuizFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuizFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuizFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizPayload>
          }
          findFirst: {
            args: Prisma.QuizFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuizFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizPayload>
          }
          findMany: {
            args: Prisma.QuizFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizPayload>[]
          }
          create: {
            args: Prisma.QuizCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizPayload>
          }
          createMany: {
            args: Prisma.QuizCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuizCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizPayload>[]
          }
          delete: {
            args: Prisma.QuizDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizPayload>
          }
          update: {
            args: Prisma.QuizUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizPayload>
          }
          deleteMany: {
            args: Prisma.QuizDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuizUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QuizUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizPayload>[]
          }
          upsert: {
            args: Prisma.QuizUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizPayload>
          }
          aggregate: {
            args: Prisma.QuizAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuiz>
          }
          groupBy: {
            args: Prisma.QuizGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuizGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuizCountArgs<ExtArgs>
            result: $Utils.Optional<QuizCountAggregateOutputType> | number
          }
        }
      }
      QuizQuestion: {
        payload: Prisma.$QuizQuestionPayload<ExtArgs>
        fields: Prisma.QuizQuestionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuizQuestionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuizQuestionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload>
          }
          findFirst: {
            args: Prisma.QuizQuestionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuizQuestionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload>
          }
          findMany: {
            args: Prisma.QuizQuestionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload>[]
          }
          create: {
            args: Prisma.QuizQuestionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload>
          }
          createMany: {
            args: Prisma.QuizQuestionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuizQuestionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload>[]
          }
          delete: {
            args: Prisma.QuizQuestionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload>
          }
          update: {
            args: Prisma.QuizQuestionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload>
          }
          deleteMany: {
            args: Prisma.QuizQuestionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuizQuestionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QuizQuestionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload>[]
          }
          upsert: {
            args: Prisma.QuizQuestionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload>
          }
          aggregate: {
            args: Prisma.QuizQuestionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuizQuestion>
          }
          groupBy: {
            args: Prisma.QuizQuestionGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuizQuestionGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuizQuestionCountArgs<ExtArgs>
            result: $Utils.Optional<QuizQuestionCountAggregateOutputType> | number
          }
        }
      }
      QuizAttempt: {
        payload: Prisma.$QuizAttemptPayload<ExtArgs>
        fields: Prisma.QuizAttemptFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuizAttemptFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizAttemptPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuizAttemptFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizAttemptPayload>
          }
          findFirst: {
            args: Prisma.QuizAttemptFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizAttemptPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuizAttemptFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizAttemptPayload>
          }
          findMany: {
            args: Prisma.QuizAttemptFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizAttemptPayload>[]
          }
          create: {
            args: Prisma.QuizAttemptCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizAttemptPayload>
          }
          createMany: {
            args: Prisma.QuizAttemptCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuizAttemptCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizAttemptPayload>[]
          }
          delete: {
            args: Prisma.QuizAttemptDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizAttemptPayload>
          }
          update: {
            args: Prisma.QuizAttemptUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizAttemptPayload>
          }
          deleteMany: {
            args: Prisma.QuizAttemptDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuizAttemptUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QuizAttemptUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizAttemptPayload>[]
          }
          upsert: {
            args: Prisma.QuizAttemptUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizAttemptPayload>
          }
          aggregate: {
            args: Prisma.QuizAttemptAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuizAttempt>
          }
          groupBy: {
            args: Prisma.QuizAttemptGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuizAttemptGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuizAttemptCountArgs<ExtArgs>
            result: $Utils.Optional<QuizAttemptCountAggregateOutputType> | number
          }
        }
      }
      Progress: {
        payload: Prisma.$ProgressPayload<ExtArgs>
        fields: Prisma.ProgressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProgressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProgressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressPayload>
          }
          findFirst: {
            args: Prisma.ProgressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProgressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressPayload>
          }
          findMany: {
            args: Prisma.ProgressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressPayload>[]
          }
          create: {
            args: Prisma.ProgressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressPayload>
          }
          createMany: {
            args: Prisma.ProgressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProgressCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressPayload>[]
          }
          delete: {
            args: Prisma.ProgressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressPayload>
          }
          update: {
            args: Prisma.ProgressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressPayload>
          }
          deleteMany: {
            args: Prisma.ProgressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProgressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProgressUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressPayload>[]
          }
          upsert: {
            args: Prisma.ProgressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressPayload>
          }
          aggregate: {
            args: Prisma.ProgressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProgress>
          }
          groupBy: {
            args: Prisma.ProgressGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProgressGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProgressCountArgs<ExtArgs>
            result: $Utils.Optional<ProgressCountAggregateOutputType> | number
          }
        }
      }
      Feedback: {
        payload: Prisma.$FeedbackPayload<ExtArgs>
        fields: Prisma.FeedbackFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FeedbackFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FeedbackFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          findFirst: {
            args: Prisma.FeedbackFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FeedbackFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          findMany: {
            args: Prisma.FeedbackFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>[]
          }
          create: {
            args: Prisma.FeedbackCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          createMany: {
            args: Prisma.FeedbackCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FeedbackCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>[]
          }
          delete: {
            args: Prisma.FeedbackDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          update: {
            args: Prisma.FeedbackUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          deleteMany: {
            args: Prisma.FeedbackDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FeedbackUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FeedbackUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>[]
          }
          upsert: {
            args: Prisma.FeedbackUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          aggregate: {
            args: Prisma.FeedbackAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFeedback>
          }
          groupBy: {
            args: Prisma.FeedbackGroupByArgs<ExtArgs>
            result: $Utils.Optional<FeedbackGroupByOutputType>[]
          }
          count: {
            args: Prisma.FeedbackCountArgs<ExtArgs>
            result: $Utils.Optional<FeedbackCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    course?: CourseOmit
    courseContent?: CourseContentOmit
    enrollment?: EnrollmentOmit
    quiz?: QuizOmit
    quizQuestion?: QuizQuestionOmit
    quizAttempt?: QuizAttemptOmit
    progress?: ProgressOmit
    feedback?: FeedbackOmit
    user?: UserOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CourseCountOutputType
   */

  export type CourseCountOutputType = {
    contents: number
    enrollments: number
    feedbacks: number
    quizzes: number
    progresses: number
  }

  export type CourseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contents?: boolean | CourseCountOutputTypeCountContentsArgs
    enrollments?: boolean | CourseCountOutputTypeCountEnrollmentsArgs
    feedbacks?: boolean | CourseCountOutputTypeCountFeedbacksArgs
    quizzes?: boolean | CourseCountOutputTypeCountQuizzesArgs
    progresses?: boolean | CourseCountOutputTypeCountProgressesArgs
  }

  // Custom InputTypes
  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseCountOutputType
     */
    select?: CourseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeCountContentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseContentWhereInput
  }

  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeCountEnrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EnrollmentWhereInput
  }

  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeCountFeedbacksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedbackWhereInput
  }

  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeCountQuizzesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuizWhereInput
  }

  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeCountProgressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProgressWhereInput
  }


  /**
   * Count Type QuizCountOutputType
   */

  export type QuizCountOutputType = {
    questions: number
    attempts: number
  }

  export type QuizCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    questions?: boolean | QuizCountOutputTypeCountQuestionsArgs
    attempts?: boolean | QuizCountOutputTypeCountAttemptsArgs
  }

  // Custom InputTypes
  /**
   * QuizCountOutputType without action
   */
  export type QuizCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizCountOutputType
     */
    select?: QuizCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * QuizCountOutputType without action
   */
  export type QuizCountOutputTypeCountQuestionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuizQuestionWhereInput
  }

  /**
   * QuizCountOutputType without action
   */
  export type QuizCountOutputTypeCountAttemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuizAttemptWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    courses: number
    feedbacks: number
    enrollments: number
    quizAttempts: number
    progresses: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    courses?: boolean | UserCountOutputTypeCountCoursesArgs
    feedbacks?: boolean | UserCountOutputTypeCountFeedbacksArgs
    enrollments?: boolean | UserCountOutputTypeCountEnrollmentsArgs
    quizAttempts?: boolean | UserCountOutputTypeCountQuizAttemptsArgs
    progresses?: boolean | UserCountOutputTypeCountProgressesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCoursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFeedbacksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedbackWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountEnrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EnrollmentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountQuizAttemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuizAttemptWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProgressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProgressWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Course
   */

  export type AggregateCourse = {
    _count: CourseCountAggregateOutputType | null
    _avg: CourseAvgAggregateOutputType | null
    _sum: CourseSumAggregateOutputType | null
    _min: CourseMinAggregateOutputType | null
    _max: CourseMaxAggregateOutputType | null
  }

  export type CourseAvgAggregateOutputType = {
    price: number | null
  }

  export type CourseSumAggregateOutputType = {
    price: number | null
  }

  export type CourseMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    thumbnail: string | null
    price: number | null
    teacherId: string | null
    createdAt: Date | null
  }

  export type CourseMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    thumbnail: string | null
    price: number | null
    teacherId: string | null
    createdAt: Date | null
  }

  export type CourseCountAggregateOutputType = {
    id: number
    title: number
    description: number
    thumbnail: number
    price: number
    teacherId: number
    createdAt: number
    _all: number
  }


  export type CourseAvgAggregateInputType = {
    price?: true
  }

  export type CourseSumAggregateInputType = {
    price?: true
  }

  export type CourseMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    thumbnail?: true
    price?: true
    teacherId?: true
    createdAt?: true
  }

  export type CourseMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    thumbnail?: true
    price?: true
    teacherId?: true
    createdAt?: true
  }

  export type CourseCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    thumbnail?: true
    price?: true
    teacherId?: true
    createdAt?: true
    _all?: true
  }

  export type CourseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Course to aggregate.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Courses
    **/
    _count?: true | CourseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CourseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CourseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CourseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CourseMaxAggregateInputType
  }

  export type GetCourseAggregateType<T extends CourseAggregateArgs> = {
        [P in keyof T & keyof AggregateCourse]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCourse[P]>
      : GetScalarType<T[P], AggregateCourse[P]>
  }




  export type CourseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseWhereInput
    orderBy?: CourseOrderByWithAggregationInput | CourseOrderByWithAggregationInput[]
    by: CourseScalarFieldEnum[] | CourseScalarFieldEnum
    having?: CourseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CourseCountAggregateInputType | true
    _avg?: CourseAvgAggregateInputType
    _sum?: CourseSumAggregateInputType
    _min?: CourseMinAggregateInputType
    _max?: CourseMaxAggregateInputType
  }

  export type CourseGroupByOutputType = {
    id: string
    title: string
    description: string
    thumbnail: string
    price: number
    teacherId: string
    createdAt: Date
    _count: CourseCountAggregateOutputType | null
    _avg: CourseAvgAggregateOutputType | null
    _sum: CourseSumAggregateOutputType | null
    _min: CourseMinAggregateOutputType | null
    _max: CourseMaxAggregateOutputType | null
  }

  type GetCourseGroupByPayload<T extends CourseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CourseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CourseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CourseGroupByOutputType[P]>
            : GetScalarType<T[P], CourseGroupByOutputType[P]>
        }
      >
    >


  export type CourseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    thumbnail?: boolean
    price?: boolean
    teacherId?: boolean
    createdAt?: boolean
    teacher?: boolean | UserDefaultArgs<ExtArgs>
    contents?: boolean | Course$contentsArgs<ExtArgs>
    enrollments?: boolean | Course$enrollmentsArgs<ExtArgs>
    feedbacks?: boolean | Course$feedbacksArgs<ExtArgs>
    quizzes?: boolean | Course$quizzesArgs<ExtArgs>
    progresses?: boolean | Course$progressesArgs<ExtArgs>
    _count?: boolean | CourseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["course"]>

  export type CourseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    thumbnail?: boolean
    price?: boolean
    teacherId?: boolean
    createdAt?: boolean
    teacher?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["course"]>

  export type CourseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    thumbnail?: boolean
    price?: boolean
    teacherId?: boolean
    createdAt?: boolean
    teacher?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["course"]>

  export type CourseSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    thumbnail?: boolean
    price?: boolean
    teacherId?: boolean
    createdAt?: boolean
  }

  export type CourseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "thumbnail" | "price" | "teacherId" | "createdAt", ExtArgs["result"]["course"]>
  export type CourseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | UserDefaultArgs<ExtArgs>
    contents?: boolean | Course$contentsArgs<ExtArgs>
    enrollments?: boolean | Course$enrollmentsArgs<ExtArgs>
    feedbacks?: boolean | Course$feedbacksArgs<ExtArgs>
    quizzes?: boolean | Course$quizzesArgs<ExtArgs>
    progresses?: boolean | Course$progressesArgs<ExtArgs>
    _count?: boolean | CourseCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CourseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CourseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CoursePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Course"
    objects: {
      teacher: Prisma.$UserPayload<ExtArgs>
      contents: Prisma.$CourseContentPayload<ExtArgs>[]
      enrollments: Prisma.$EnrollmentPayload<ExtArgs>[]
      feedbacks: Prisma.$FeedbackPayload<ExtArgs>[]
      quizzes: Prisma.$QuizPayload<ExtArgs>[]
      progresses: Prisma.$ProgressPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      thumbnail: string
      price: number
      teacherId: string
      createdAt: Date
    }, ExtArgs["result"]["course"]>
    composites: {}
  }

  type CourseGetPayload<S extends boolean | null | undefined | CourseDefaultArgs> = $Result.GetResult<Prisma.$CoursePayload, S>

  type CourseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CourseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CourseCountAggregateInputType | true
    }

  export interface CourseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Course'], meta: { name: 'Course' } }
    /**
     * Find zero or one Course that matches the filter.
     * @param {CourseFindUniqueArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CourseFindUniqueArgs>(args: SelectSubset<T, CourseFindUniqueArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Course that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CourseFindUniqueOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CourseFindUniqueOrThrowArgs>(args: SelectSubset<T, CourseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Course that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CourseFindFirstArgs>(args?: SelectSubset<T, CourseFindFirstArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Course that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CourseFindFirstOrThrowArgs>(args?: SelectSubset<T, CourseFindFirstOrThrowArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Courses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Courses
     * const courses = await prisma.course.findMany()
     * 
     * // Get first 10 Courses
     * const courses = await prisma.course.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const courseWithIdOnly = await prisma.course.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CourseFindManyArgs>(args?: SelectSubset<T, CourseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Course.
     * @param {CourseCreateArgs} args - Arguments to create a Course.
     * @example
     * // Create one Course
     * const Course = await prisma.course.create({
     *   data: {
     *     // ... data to create a Course
     *   }
     * })
     * 
     */
    create<T extends CourseCreateArgs>(args: SelectSubset<T, CourseCreateArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Courses.
     * @param {CourseCreateManyArgs} args - Arguments to create many Courses.
     * @example
     * // Create many Courses
     * const course = await prisma.course.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CourseCreateManyArgs>(args?: SelectSubset<T, CourseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Courses and returns the data saved in the database.
     * @param {CourseCreateManyAndReturnArgs} args - Arguments to create many Courses.
     * @example
     * // Create many Courses
     * const course = await prisma.course.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Courses and only return the `id`
     * const courseWithIdOnly = await prisma.course.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CourseCreateManyAndReturnArgs>(args?: SelectSubset<T, CourseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Course.
     * @param {CourseDeleteArgs} args - Arguments to delete one Course.
     * @example
     * // Delete one Course
     * const Course = await prisma.course.delete({
     *   where: {
     *     // ... filter to delete one Course
     *   }
     * })
     * 
     */
    delete<T extends CourseDeleteArgs>(args: SelectSubset<T, CourseDeleteArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Course.
     * @param {CourseUpdateArgs} args - Arguments to update one Course.
     * @example
     * // Update one Course
     * const course = await prisma.course.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CourseUpdateArgs>(args: SelectSubset<T, CourseUpdateArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Courses.
     * @param {CourseDeleteManyArgs} args - Arguments to filter Courses to delete.
     * @example
     * // Delete a few Courses
     * const { count } = await prisma.course.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CourseDeleteManyArgs>(args?: SelectSubset<T, CourseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Courses
     * const course = await prisma.course.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CourseUpdateManyArgs>(args: SelectSubset<T, CourseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Courses and returns the data updated in the database.
     * @param {CourseUpdateManyAndReturnArgs} args - Arguments to update many Courses.
     * @example
     * // Update many Courses
     * const course = await prisma.course.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Courses and only return the `id`
     * const courseWithIdOnly = await prisma.course.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CourseUpdateManyAndReturnArgs>(args: SelectSubset<T, CourseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Course.
     * @param {CourseUpsertArgs} args - Arguments to update or create a Course.
     * @example
     * // Update or create a Course
     * const course = await prisma.course.upsert({
     *   create: {
     *     // ... data to create a Course
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Course we want to update
     *   }
     * })
     */
    upsert<T extends CourseUpsertArgs>(args: SelectSubset<T, CourseUpsertArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseCountArgs} args - Arguments to filter Courses to count.
     * @example
     * // Count the number of Courses
     * const count = await prisma.course.count({
     *   where: {
     *     // ... the filter for the Courses we want to count
     *   }
     * })
    **/
    count<T extends CourseCountArgs>(
      args?: Subset<T, CourseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CourseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CourseAggregateArgs>(args: Subset<T, CourseAggregateArgs>): Prisma.PrismaPromise<GetCourseAggregateType<T>>

    /**
     * Group by Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CourseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CourseGroupByArgs['orderBy'] }
        : { orderBy?: CourseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CourseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCourseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Course model
   */
  readonly fields: CourseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Course.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CourseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    teacher<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    contents<T extends Course$contentsArgs<ExtArgs> = {}>(args?: Subset<T, Course$contentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CourseContentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    enrollments<T extends Course$enrollmentsArgs<ExtArgs> = {}>(args?: Subset<T, Course$enrollmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    feedbacks<T extends Course$feedbacksArgs<ExtArgs> = {}>(args?: Subset<T, Course$feedbacksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    quizzes<T extends Course$quizzesArgs<ExtArgs> = {}>(args?: Subset<T, Course$quizzesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    progresses<T extends Course$progressesArgs<ExtArgs> = {}>(args?: Subset<T, Course$progressesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Course model
   */
  interface CourseFieldRefs {
    readonly id: FieldRef<"Course", 'String'>
    readonly title: FieldRef<"Course", 'String'>
    readonly description: FieldRef<"Course", 'String'>
    readonly thumbnail: FieldRef<"Course", 'String'>
    readonly price: FieldRef<"Course", 'Float'>
    readonly teacherId: FieldRef<"Course", 'String'>
    readonly createdAt: FieldRef<"Course", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Course findUnique
   */
  export type CourseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course findUniqueOrThrow
   */
  export type CourseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course findFirst
   */
  export type CourseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course findFirstOrThrow
   */
  export type CourseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course findMany
   */
  export type CourseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Courses to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course create
   */
  export type CourseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The data needed to create a Course.
     */
    data: XOR<CourseCreateInput, CourseUncheckedCreateInput>
  }

  /**
   * Course createMany
   */
  export type CourseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Courses.
     */
    data: CourseCreateManyInput | CourseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Course createManyAndReturn
   */
  export type CourseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * The data used to create many Courses.
     */
    data: CourseCreateManyInput | CourseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Course update
   */
  export type CourseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The data needed to update a Course.
     */
    data: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>
    /**
     * Choose, which Course to update.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course updateMany
   */
  export type CourseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Courses.
     */
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyInput>
    /**
     * Filter which Courses to update
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to update.
     */
    limit?: number
  }

  /**
   * Course updateManyAndReturn
   */
  export type CourseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * The data used to update Courses.
     */
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyInput>
    /**
     * Filter which Courses to update
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Course upsert
   */
  export type CourseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The filter to search for the Course to update in case it exists.
     */
    where: CourseWhereUniqueInput
    /**
     * In case the Course found by the `where` argument doesn't exist, create a new Course with this data.
     */
    create: XOR<CourseCreateInput, CourseUncheckedCreateInput>
    /**
     * In case the Course was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>
  }

  /**
   * Course delete
   */
  export type CourseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter which Course to delete.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course deleteMany
   */
  export type CourseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Courses to delete
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to delete.
     */
    limit?: number
  }

  /**
   * Course.contents
   */
  export type Course$contentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseContent
     */
    select?: CourseContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseContent
     */
    omit?: CourseContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseContentInclude<ExtArgs> | null
    where?: CourseContentWhereInput
    orderBy?: CourseContentOrderByWithRelationInput | CourseContentOrderByWithRelationInput[]
    cursor?: CourseContentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CourseContentScalarFieldEnum | CourseContentScalarFieldEnum[]
  }

  /**
   * Course.enrollments
   */
  export type Course$enrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    where?: EnrollmentWhereInput
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    cursor?: EnrollmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * Course.feedbacks
   */
  export type Course$feedbacksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    where?: FeedbackWhereInput
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    cursor?: FeedbackWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * Course.quizzes
   */
  export type Course$quizzesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quiz
     */
    omit?: QuizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizInclude<ExtArgs> | null
    where?: QuizWhereInput
    orderBy?: QuizOrderByWithRelationInput | QuizOrderByWithRelationInput[]
    cursor?: QuizWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuizScalarFieldEnum | QuizScalarFieldEnum[]
  }

  /**
   * Course.progresses
   */
  export type Course$progressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Progress
     */
    omit?: ProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressInclude<ExtArgs> | null
    where?: ProgressWhereInput
    orderBy?: ProgressOrderByWithRelationInput | ProgressOrderByWithRelationInput[]
    cursor?: ProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProgressScalarFieldEnum | ProgressScalarFieldEnum[]
  }

  /**
   * Course without action
   */
  export type CourseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
  }


  /**
   * Model CourseContent
   */

  export type AggregateCourseContent = {
    _count: CourseContentCountAggregateOutputType | null
    _avg: CourseContentAvgAggregateOutputType | null
    _sum: CourseContentSumAggregateOutputType | null
    _min: CourseContentMinAggregateOutputType | null
    _max: CourseContentMaxAggregateOutputType | null
  }

  export type CourseContentAvgAggregateOutputType = {
    orderIndex: number | null
  }

  export type CourseContentSumAggregateOutputType = {
    orderIndex: number | null
  }

  export type CourseContentMinAggregateOutputType = {
    id: string | null
    title: string | null
    type: $Enums.ContentType | null
    url: string | null
    courseId: string | null
    orderIndex: number | null
  }

  export type CourseContentMaxAggregateOutputType = {
    id: string | null
    title: string | null
    type: $Enums.ContentType | null
    url: string | null
    courseId: string | null
    orderIndex: number | null
  }

  export type CourseContentCountAggregateOutputType = {
    id: number
    title: number
    type: number
    url: number
    courseId: number
    orderIndex: number
    _all: number
  }


  export type CourseContentAvgAggregateInputType = {
    orderIndex?: true
  }

  export type CourseContentSumAggregateInputType = {
    orderIndex?: true
  }

  export type CourseContentMinAggregateInputType = {
    id?: true
    title?: true
    type?: true
    url?: true
    courseId?: true
    orderIndex?: true
  }

  export type CourseContentMaxAggregateInputType = {
    id?: true
    title?: true
    type?: true
    url?: true
    courseId?: true
    orderIndex?: true
  }

  export type CourseContentCountAggregateInputType = {
    id?: true
    title?: true
    type?: true
    url?: true
    courseId?: true
    orderIndex?: true
    _all?: true
  }

  export type CourseContentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CourseContent to aggregate.
     */
    where?: CourseContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseContents to fetch.
     */
    orderBy?: CourseContentOrderByWithRelationInput | CourseContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CourseContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseContents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseContents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CourseContents
    **/
    _count?: true | CourseContentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CourseContentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CourseContentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CourseContentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CourseContentMaxAggregateInputType
  }

  export type GetCourseContentAggregateType<T extends CourseContentAggregateArgs> = {
        [P in keyof T & keyof AggregateCourseContent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCourseContent[P]>
      : GetScalarType<T[P], AggregateCourseContent[P]>
  }




  export type CourseContentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseContentWhereInput
    orderBy?: CourseContentOrderByWithAggregationInput | CourseContentOrderByWithAggregationInput[]
    by: CourseContentScalarFieldEnum[] | CourseContentScalarFieldEnum
    having?: CourseContentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CourseContentCountAggregateInputType | true
    _avg?: CourseContentAvgAggregateInputType
    _sum?: CourseContentSumAggregateInputType
    _min?: CourseContentMinAggregateInputType
    _max?: CourseContentMaxAggregateInputType
  }

  export type CourseContentGroupByOutputType = {
    id: string
    title: string
    type: $Enums.ContentType
    url: string
    courseId: string
    orderIndex: number
    _count: CourseContentCountAggregateOutputType | null
    _avg: CourseContentAvgAggregateOutputType | null
    _sum: CourseContentSumAggregateOutputType | null
    _min: CourseContentMinAggregateOutputType | null
    _max: CourseContentMaxAggregateOutputType | null
  }

  type GetCourseContentGroupByPayload<T extends CourseContentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CourseContentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CourseContentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CourseContentGroupByOutputType[P]>
            : GetScalarType<T[P], CourseContentGroupByOutputType[P]>
        }
      >
    >


  export type CourseContentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    type?: boolean
    url?: boolean
    courseId?: boolean
    orderIndex?: boolean
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["courseContent"]>

  export type CourseContentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    type?: boolean
    url?: boolean
    courseId?: boolean
    orderIndex?: boolean
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["courseContent"]>

  export type CourseContentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    type?: boolean
    url?: boolean
    courseId?: boolean
    orderIndex?: boolean
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["courseContent"]>

  export type CourseContentSelectScalar = {
    id?: boolean
    title?: boolean
    type?: boolean
    url?: boolean
    courseId?: boolean
    orderIndex?: boolean
  }

  export type CourseContentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "type" | "url" | "courseId" | "orderIndex", ExtArgs["result"]["courseContent"]>
  export type CourseContentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }
  export type CourseContentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }
  export type CourseContentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }

  export type $CourseContentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CourseContent"
    objects: {
      course: Prisma.$CoursePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      type: $Enums.ContentType
      url: string
      courseId: string
      orderIndex: number
    }, ExtArgs["result"]["courseContent"]>
    composites: {}
  }

  type CourseContentGetPayload<S extends boolean | null | undefined | CourseContentDefaultArgs> = $Result.GetResult<Prisma.$CourseContentPayload, S>

  type CourseContentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CourseContentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CourseContentCountAggregateInputType | true
    }

  export interface CourseContentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CourseContent'], meta: { name: 'CourseContent' } }
    /**
     * Find zero or one CourseContent that matches the filter.
     * @param {CourseContentFindUniqueArgs} args - Arguments to find a CourseContent
     * @example
     * // Get one CourseContent
     * const courseContent = await prisma.courseContent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CourseContentFindUniqueArgs>(args: SelectSubset<T, CourseContentFindUniqueArgs<ExtArgs>>): Prisma__CourseContentClient<$Result.GetResult<Prisma.$CourseContentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CourseContent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CourseContentFindUniqueOrThrowArgs} args - Arguments to find a CourseContent
     * @example
     * // Get one CourseContent
     * const courseContent = await prisma.courseContent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CourseContentFindUniqueOrThrowArgs>(args: SelectSubset<T, CourseContentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CourseContentClient<$Result.GetResult<Prisma.$CourseContentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CourseContent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseContentFindFirstArgs} args - Arguments to find a CourseContent
     * @example
     * // Get one CourseContent
     * const courseContent = await prisma.courseContent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CourseContentFindFirstArgs>(args?: SelectSubset<T, CourseContentFindFirstArgs<ExtArgs>>): Prisma__CourseContentClient<$Result.GetResult<Prisma.$CourseContentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CourseContent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseContentFindFirstOrThrowArgs} args - Arguments to find a CourseContent
     * @example
     * // Get one CourseContent
     * const courseContent = await prisma.courseContent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CourseContentFindFirstOrThrowArgs>(args?: SelectSubset<T, CourseContentFindFirstOrThrowArgs<ExtArgs>>): Prisma__CourseContentClient<$Result.GetResult<Prisma.$CourseContentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CourseContents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseContentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CourseContents
     * const courseContents = await prisma.courseContent.findMany()
     * 
     * // Get first 10 CourseContents
     * const courseContents = await prisma.courseContent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const courseContentWithIdOnly = await prisma.courseContent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CourseContentFindManyArgs>(args?: SelectSubset<T, CourseContentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CourseContentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CourseContent.
     * @param {CourseContentCreateArgs} args - Arguments to create a CourseContent.
     * @example
     * // Create one CourseContent
     * const CourseContent = await prisma.courseContent.create({
     *   data: {
     *     // ... data to create a CourseContent
     *   }
     * })
     * 
     */
    create<T extends CourseContentCreateArgs>(args: SelectSubset<T, CourseContentCreateArgs<ExtArgs>>): Prisma__CourseContentClient<$Result.GetResult<Prisma.$CourseContentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CourseContents.
     * @param {CourseContentCreateManyArgs} args - Arguments to create many CourseContents.
     * @example
     * // Create many CourseContents
     * const courseContent = await prisma.courseContent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CourseContentCreateManyArgs>(args?: SelectSubset<T, CourseContentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CourseContents and returns the data saved in the database.
     * @param {CourseContentCreateManyAndReturnArgs} args - Arguments to create many CourseContents.
     * @example
     * // Create many CourseContents
     * const courseContent = await prisma.courseContent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CourseContents and only return the `id`
     * const courseContentWithIdOnly = await prisma.courseContent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CourseContentCreateManyAndReturnArgs>(args?: SelectSubset<T, CourseContentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CourseContentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CourseContent.
     * @param {CourseContentDeleteArgs} args - Arguments to delete one CourseContent.
     * @example
     * // Delete one CourseContent
     * const CourseContent = await prisma.courseContent.delete({
     *   where: {
     *     // ... filter to delete one CourseContent
     *   }
     * })
     * 
     */
    delete<T extends CourseContentDeleteArgs>(args: SelectSubset<T, CourseContentDeleteArgs<ExtArgs>>): Prisma__CourseContentClient<$Result.GetResult<Prisma.$CourseContentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CourseContent.
     * @param {CourseContentUpdateArgs} args - Arguments to update one CourseContent.
     * @example
     * // Update one CourseContent
     * const courseContent = await prisma.courseContent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CourseContentUpdateArgs>(args: SelectSubset<T, CourseContentUpdateArgs<ExtArgs>>): Prisma__CourseContentClient<$Result.GetResult<Prisma.$CourseContentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CourseContents.
     * @param {CourseContentDeleteManyArgs} args - Arguments to filter CourseContents to delete.
     * @example
     * // Delete a few CourseContents
     * const { count } = await prisma.courseContent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CourseContentDeleteManyArgs>(args?: SelectSubset<T, CourseContentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CourseContents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseContentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CourseContents
     * const courseContent = await prisma.courseContent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CourseContentUpdateManyArgs>(args: SelectSubset<T, CourseContentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CourseContents and returns the data updated in the database.
     * @param {CourseContentUpdateManyAndReturnArgs} args - Arguments to update many CourseContents.
     * @example
     * // Update many CourseContents
     * const courseContent = await prisma.courseContent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CourseContents and only return the `id`
     * const courseContentWithIdOnly = await prisma.courseContent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CourseContentUpdateManyAndReturnArgs>(args: SelectSubset<T, CourseContentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CourseContentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CourseContent.
     * @param {CourseContentUpsertArgs} args - Arguments to update or create a CourseContent.
     * @example
     * // Update or create a CourseContent
     * const courseContent = await prisma.courseContent.upsert({
     *   create: {
     *     // ... data to create a CourseContent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CourseContent we want to update
     *   }
     * })
     */
    upsert<T extends CourseContentUpsertArgs>(args: SelectSubset<T, CourseContentUpsertArgs<ExtArgs>>): Prisma__CourseContentClient<$Result.GetResult<Prisma.$CourseContentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CourseContents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseContentCountArgs} args - Arguments to filter CourseContents to count.
     * @example
     * // Count the number of CourseContents
     * const count = await prisma.courseContent.count({
     *   where: {
     *     // ... the filter for the CourseContents we want to count
     *   }
     * })
    **/
    count<T extends CourseContentCountArgs>(
      args?: Subset<T, CourseContentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CourseContentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CourseContent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseContentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CourseContentAggregateArgs>(args: Subset<T, CourseContentAggregateArgs>): Prisma.PrismaPromise<GetCourseContentAggregateType<T>>

    /**
     * Group by CourseContent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseContentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CourseContentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CourseContentGroupByArgs['orderBy'] }
        : { orderBy?: CourseContentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CourseContentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCourseContentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CourseContent model
   */
  readonly fields: CourseContentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CourseContent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CourseContentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    course<T extends CourseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CourseDefaultArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CourseContent model
   */
  interface CourseContentFieldRefs {
    readonly id: FieldRef<"CourseContent", 'String'>
    readonly title: FieldRef<"CourseContent", 'String'>
    readonly type: FieldRef<"CourseContent", 'ContentType'>
    readonly url: FieldRef<"CourseContent", 'String'>
    readonly courseId: FieldRef<"CourseContent", 'String'>
    readonly orderIndex: FieldRef<"CourseContent", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * CourseContent findUnique
   */
  export type CourseContentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseContent
     */
    select?: CourseContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseContent
     */
    omit?: CourseContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseContentInclude<ExtArgs> | null
    /**
     * Filter, which CourseContent to fetch.
     */
    where: CourseContentWhereUniqueInput
  }

  /**
   * CourseContent findUniqueOrThrow
   */
  export type CourseContentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseContent
     */
    select?: CourseContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseContent
     */
    omit?: CourseContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseContentInclude<ExtArgs> | null
    /**
     * Filter, which CourseContent to fetch.
     */
    where: CourseContentWhereUniqueInput
  }

  /**
   * CourseContent findFirst
   */
  export type CourseContentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseContent
     */
    select?: CourseContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseContent
     */
    omit?: CourseContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseContentInclude<ExtArgs> | null
    /**
     * Filter, which CourseContent to fetch.
     */
    where?: CourseContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseContents to fetch.
     */
    orderBy?: CourseContentOrderByWithRelationInput | CourseContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CourseContents.
     */
    cursor?: CourseContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseContents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseContents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CourseContents.
     */
    distinct?: CourseContentScalarFieldEnum | CourseContentScalarFieldEnum[]
  }

  /**
   * CourseContent findFirstOrThrow
   */
  export type CourseContentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseContent
     */
    select?: CourseContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseContent
     */
    omit?: CourseContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseContentInclude<ExtArgs> | null
    /**
     * Filter, which CourseContent to fetch.
     */
    where?: CourseContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseContents to fetch.
     */
    orderBy?: CourseContentOrderByWithRelationInput | CourseContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CourseContents.
     */
    cursor?: CourseContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseContents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseContents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CourseContents.
     */
    distinct?: CourseContentScalarFieldEnum | CourseContentScalarFieldEnum[]
  }

  /**
   * CourseContent findMany
   */
  export type CourseContentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseContent
     */
    select?: CourseContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseContent
     */
    omit?: CourseContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseContentInclude<ExtArgs> | null
    /**
     * Filter, which CourseContents to fetch.
     */
    where?: CourseContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseContents to fetch.
     */
    orderBy?: CourseContentOrderByWithRelationInput | CourseContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CourseContents.
     */
    cursor?: CourseContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseContents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseContents.
     */
    skip?: number
    distinct?: CourseContentScalarFieldEnum | CourseContentScalarFieldEnum[]
  }

  /**
   * CourseContent create
   */
  export type CourseContentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseContent
     */
    select?: CourseContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseContent
     */
    omit?: CourseContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseContentInclude<ExtArgs> | null
    /**
     * The data needed to create a CourseContent.
     */
    data: XOR<CourseContentCreateInput, CourseContentUncheckedCreateInput>
  }

  /**
   * CourseContent createMany
   */
  export type CourseContentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CourseContents.
     */
    data: CourseContentCreateManyInput | CourseContentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CourseContent createManyAndReturn
   */
  export type CourseContentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseContent
     */
    select?: CourseContentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CourseContent
     */
    omit?: CourseContentOmit<ExtArgs> | null
    /**
     * The data used to create many CourseContents.
     */
    data: CourseContentCreateManyInput | CourseContentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseContentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CourseContent update
   */
  export type CourseContentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseContent
     */
    select?: CourseContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseContent
     */
    omit?: CourseContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseContentInclude<ExtArgs> | null
    /**
     * The data needed to update a CourseContent.
     */
    data: XOR<CourseContentUpdateInput, CourseContentUncheckedUpdateInput>
    /**
     * Choose, which CourseContent to update.
     */
    where: CourseContentWhereUniqueInput
  }

  /**
   * CourseContent updateMany
   */
  export type CourseContentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CourseContents.
     */
    data: XOR<CourseContentUpdateManyMutationInput, CourseContentUncheckedUpdateManyInput>
    /**
     * Filter which CourseContents to update
     */
    where?: CourseContentWhereInput
    /**
     * Limit how many CourseContents to update.
     */
    limit?: number
  }

  /**
   * CourseContent updateManyAndReturn
   */
  export type CourseContentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseContent
     */
    select?: CourseContentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CourseContent
     */
    omit?: CourseContentOmit<ExtArgs> | null
    /**
     * The data used to update CourseContents.
     */
    data: XOR<CourseContentUpdateManyMutationInput, CourseContentUncheckedUpdateManyInput>
    /**
     * Filter which CourseContents to update
     */
    where?: CourseContentWhereInput
    /**
     * Limit how many CourseContents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseContentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CourseContent upsert
   */
  export type CourseContentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseContent
     */
    select?: CourseContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseContent
     */
    omit?: CourseContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseContentInclude<ExtArgs> | null
    /**
     * The filter to search for the CourseContent to update in case it exists.
     */
    where: CourseContentWhereUniqueInput
    /**
     * In case the CourseContent found by the `where` argument doesn't exist, create a new CourseContent with this data.
     */
    create: XOR<CourseContentCreateInput, CourseContentUncheckedCreateInput>
    /**
     * In case the CourseContent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CourseContentUpdateInput, CourseContentUncheckedUpdateInput>
  }

  /**
   * CourseContent delete
   */
  export type CourseContentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseContent
     */
    select?: CourseContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseContent
     */
    omit?: CourseContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseContentInclude<ExtArgs> | null
    /**
     * Filter which CourseContent to delete.
     */
    where: CourseContentWhereUniqueInput
  }

  /**
   * CourseContent deleteMany
   */
  export type CourseContentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CourseContents to delete
     */
    where?: CourseContentWhereInput
    /**
     * Limit how many CourseContents to delete.
     */
    limit?: number
  }

  /**
   * CourseContent without action
   */
  export type CourseContentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseContent
     */
    select?: CourseContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseContent
     */
    omit?: CourseContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseContentInclude<ExtArgs> | null
  }


  /**
   * Model Enrollment
   */

  export type AggregateEnrollment = {
    _count: EnrollmentCountAggregateOutputType | null
    _min: EnrollmentMinAggregateOutputType | null
    _max: EnrollmentMaxAggregateOutputType | null
  }

  export type EnrollmentMinAggregateOutputType = {
    id: string | null
    studentId: string | null
    courseId: string | null
    enrolledAt: Date | null
  }

  export type EnrollmentMaxAggregateOutputType = {
    id: string | null
    studentId: string | null
    courseId: string | null
    enrolledAt: Date | null
  }

  export type EnrollmentCountAggregateOutputType = {
    id: number
    studentId: number
    courseId: number
    enrolledAt: number
    _all: number
  }


  export type EnrollmentMinAggregateInputType = {
    id?: true
    studentId?: true
    courseId?: true
    enrolledAt?: true
  }

  export type EnrollmentMaxAggregateInputType = {
    id?: true
    studentId?: true
    courseId?: true
    enrolledAt?: true
  }

  export type EnrollmentCountAggregateInputType = {
    id?: true
    studentId?: true
    courseId?: true
    enrolledAt?: true
    _all?: true
  }

  export type EnrollmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Enrollment to aggregate.
     */
    where?: EnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enrollments to fetch.
     */
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enrollments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Enrollments
    **/
    _count?: true | EnrollmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EnrollmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EnrollmentMaxAggregateInputType
  }

  export type GetEnrollmentAggregateType<T extends EnrollmentAggregateArgs> = {
        [P in keyof T & keyof AggregateEnrollment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEnrollment[P]>
      : GetScalarType<T[P], AggregateEnrollment[P]>
  }




  export type EnrollmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EnrollmentWhereInput
    orderBy?: EnrollmentOrderByWithAggregationInput | EnrollmentOrderByWithAggregationInput[]
    by: EnrollmentScalarFieldEnum[] | EnrollmentScalarFieldEnum
    having?: EnrollmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EnrollmentCountAggregateInputType | true
    _min?: EnrollmentMinAggregateInputType
    _max?: EnrollmentMaxAggregateInputType
  }

  export type EnrollmentGroupByOutputType = {
    id: string
    studentId: string
    courseId: string
    enrolledAt: Date
    _count: EnrollmentCountAggregateOutputType | null
    _min: EnrollmentMinAggregateOutputType | null
    _max: EnrollmentMaxAggregateOutputType | null
  }

  type GetEnrollmentGroupByPayload<T extends EnrollmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EnrollmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EnrollmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EnrollmentGroupByOutputType[P]>
            : GetScalarType<T[P], EnrollmentGroupByOutputType[P]>
        }
      >
    >


  export type EnrollmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    courseId?: boolean
    enrolledAt?: boolean
    student?: boolean | UserDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["enrollment"]>

  export type EnrollmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    courseId?: boolean
    enrolledAt?: boolean
    student?: boolean | UserDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["enrollment"]>

  export type EnrollmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    courseId?: boolean
    enrolledAt?: boolean
    student?: boolean | UserDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["enrollment"]>

  export type EnrollmentSelectScalar = {
    id?: boolean
    studentId?: boolean
    courseId?: boolean
    enrolledAt?: boolean
  }

  export type EnrollmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentId" | "courseId" | "enrolledAt", ExtArgs["result"]["enrollment"]>
  export type EnrollmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | UserDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }
  export type EnrollmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | UserDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }
  export type EnrollmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | UserDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }

  export type $EnrollmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Enrollment"
    objects: {
      student: Prisma.$UserPayload<ExtArgs>
      course: Prisma.$CoursePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      studentId: string
      courseId: string
      enrolledAt: Date
    }, ExtArgs["result"]["enrollment"]>
    composites: {}
  }

  type EnrollmentGetPayload<S extends boolean | null | undefined | EnrollmentDefaultArgs> = $Result.GetResult<Prisma.$EnrollmentPayload, S>

  type EnrollmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EnrollmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EnrollmentCountAggregateInputType | true
    }

  export interface EnrollmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Enrollment'], meta: { name: 'Enrollment' } }
    /**
     * Find zero or one Enrollment that matches the filter.
     * @param {EnrollmentFindUniqueArgs} args - Arguments to find a Enrollment
     * @example
     * // Get one Enrollment
     * const enrollment = await prisma.enrollment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EnrollmentFindUniqueArgs>(args: SelectSubset<T, EnrollmentFindUniqueArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Enrollment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EnrollmentFindUniqueOrThrowArgs} args - Arguments to find a Enrollment
     * @example
     * // Get one Enrollment
     * const enrollment = await prisma.enrollment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EnrollmentFindUniqueOrThrowArgs>(args: SelectSubset<T, EnrollmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Enrollment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentFindFirstArgs} args - Arguments to find a Enrollment
     * @example
     * // Get one Enrollment
     * const enrollment = await prisma.enrollment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EnrollmentFindFirstArgs>(args?: SelectSubset<T, EnrollmentFindFirstArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Enrollment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentFindFirstOrThrowArgs} args - Arguments to find a Enrollment
     * @example
     * // Get one Enrollment
     * const enrollment = await prisma.enrollment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EnrollmentFindFirstOrThrowArgs>(args?: SelectSubset<T, EnrollmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Enrollments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Enrollments
     * const enrollments = await prisma.enrollment.findMany()
     * 
     * // Get first 10 Enrollments
     * const enrollments = await prisma.enrollment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const enrollmentWithIdOnly = await prisma.enrollment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EnrollmentFindManyArgs>(args?: SelectSubset<T, EnrollmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Enrollment.
     * @param {EnrollmentCreateArgs} args - Arguments to create a Enrollment.
     * @example
     * // Create one Enrollment
     * const Enrollment = await prisma.enrollment.create({
     *   data: {
     *     // ... data to create a Enrollment
     *   }
     * })
     * 
     */
    create<T extends EnrollmentCreateArgs>(args: SelectSubset<T, EnrollmentCreateArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Enrollments.
     * @param {EnrollmentCreateManyArgs} args - Arguments to create many Enrollments.
     * @example
     * // Create many Enrollments
     * const enrollment = await prisma.enrollment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EnrollmentCreateManyArgs>(args?: SelectSubset<T, EnrollmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Enrollments and returns the data saved in the database.
     * @param {EnrollmentCreateManyAndReturnArgs} args - Arguments to create many Enrollments.
     * @example
     * // Create many Enrollments
     * const enrollment = await prisma.enrollment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Enrollments and only return the `id`
     * const enrollmentWithIdOnly = await prisma.enrollment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EnrollmentCreateManyAndReturnArgs>(args?: SelectSubset<T, EnrollmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Enrollment.
     * @param {EnrollmentDeleteArgs} args - Arguments to delete one Enrollment.
     * @example
     * // Delete one Enrollment
     * const Enrollment = await prisma.enrollment.delete({
     *   where: {
     *     // ... filter to delete one Enrollment
     *   }
     * })
     * 
     */
    delete<T extends EnrollmentDeleteArgs>(args: SelectSubset<T, EnrollmentDeleteArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Enrollment.
     * @param {EnrollmentUpdateArgs} args - Arguments to update one Enrollment.
     * @example
     * // Update one Enrollment
     * const enrollment = await prisma.enrollment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EnrollmentUpdateArgs>(args: SelectSubset<T, EnrollmentUpdateArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Enrollments.
     * @param {EnrollmentDeleteManyArgs} args - Arguments to filter Enrollments to delete.
     * @example
     * // Delete a few Enrollments
     * const { count } = await prisma.enrollment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EnrollmentDeleteManyArgs>(args?: SelectSubset<T, EnrollmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Enrollments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Enrollments
     * const enrollment = await prisma.enrollment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EnrollmentUpdateManyArgs>(args: SelectSubset<T, EnrollmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Enrollments and returns the data updated in the database.
     * @param {EnrollmentUpdateManyAndReturnArgs} args - Arguments to update many Enrollments.
     * @example
     * // Update many Enrollments
     * const enrollment = await prisma.enrollment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Enrollments and only return the `id`
     * const enrollmentWithIdOnly = await prisma.enrollment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EnrollmentUpdateManyAndReturnArgs>(args: SelectSubset<T, EnrollmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Enrollment.
     * @param {EnrollmentUpsertArgs} args - Arguments to update or create a Enrollment.
     * @example
     * // Update or create a Enrollment
     * const enrollment = await prisma.enrollment.upsert({
     *   create: {
     *     // ... data to create a Enrollment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Enrollment we want to update
     *   }
     * })
     */
    upsert<T extends EnrollmentUpsertArgs>(args: SelectSubset<T, EnrollmentUpsertArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Enrollments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentCountArgs} args - Arguments to filter Enrollments to count.
     * @example
     * // Count the number of Enrollments
     * const count = await prisma.enrollment.count({
     *   where: {
     *     // ... the filter for the Enrollments we want to count
     *   }
     * })
    **/
    count<T extends EnrollmentCountArgs>(
      args?: Subset<T, EnrollmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EnrollmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Enrollment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EnrollmentAggregateArgs>(args: Subset<T, EnrollmentAggregateArgs>): Prisma.PrismaPromise<GetEnrollmentAggregateType<T>>

    /**
     * Group by Enrollment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EnrollmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EnrollmentGroupByArgs['orderBy'] }
        : { orderBy?: EnrollmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EnrollmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEnrollmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Enrollment model
   */
  readonly fields: EnrollmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Enrollment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EnrollmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    course<T extends CourseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CourseDefaultArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Enrollment model
   */
  interface EnrollmentFieldRefs {
    readonly id: FieldRef<"Enrollment", 'String'>
    readonly studentId: FieldRef<"Enrollment", 'String'>
    readonly courseId: FieldRef<"Enrollment", 'String'>
    readonly enrolledAt: FieldRef<"Enrollment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Enrollment findUnique
   */
  export type EnrollmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollment to fetch.
     */
    where: EnrollmentWhereUniqueInput
  }

  /**
   * Enrollment findUniqueOrThrow
   */
  export type EnrollmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollment to fetch.
     */
    where: EnrollmentWhereUniqueInput
  }

  /**
   * Enrollment findFirst
   */
  export type EnrollmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollment to fetch.
     */
    where?: EnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enrollments to fetch.
     */
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Enrollments.
     */
    cursor?: EnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enrollments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Enrollments.
     */
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * Enrollment findFirstOrThrow
   */
  export type EnrollmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollment to fetch.
     */
    where?: EnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enrollments to fetch.
     */
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Enrollments.
     */
    cursor?: EnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enrollments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Enrollments.
     */
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * Enrollment findMany
   */
  export type EnrollmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollments to fetch.
     */
    where?: EnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enrollments to fetch.
     */
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Enrollments.
     */
    cursor?: EnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enrollments.
     */
    skip?: number
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * Enrollment create
   */
  export type EnrollmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Enrollment.
     */
    data: XOR<EnrollmentCreateInput, EnrollmentUncheckedCreateInput>
  }

  /**
   * Enrollment createMany
   */
  export type EnrollmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Enrollments.
     */
    data: EnrollmentCreateManyInput | EnrollmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Enrollment createManyAndReturn
   */
  export type EnrollmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * The data used to create many Enrollments.
     */
    data: EnrollmentCreateManyInput | EnrollmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Enrollment update
   */
  export type EnrollmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Enrollment.
     */
    data: XOR<EnrollmentUpdateInput, EnrollmentUncheckedUpdateInput>
    /**
     * Choose, which Enrollment to update.
     */
    where: EnrollmentWhereUniqueInput
  }

  /**
   * Enrollment updateMany
   */
  export type EnrollmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Enrollments.
     */
    data: XOR<EnrollmentUpdateManyMutationInput, EnrollmentUncheckedUpdateManyInput>
    /**
     * Filter which Enrollments to update
     */
    where?: EnrollmentWhereInput
    /**
     * Limit how many Enrollments to update.
     */
    limit?: number
  }

  /**
   * Enrollment updateManyAndReturn
   */
  export type EnrollmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * The data used to update Enrollments.
     */
    data: XOR<EnrollmentUpdateManyMutationInput, EnrollmentUncheckedUpdateManyInput>
    /**
     * Filter which Enrollments to update
     */
    where?: EnrollmentWhereInput
    /**
     * Limit how many Enrollments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Enrollment upsert
   */
  export type EnrollmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Enrollment to update in case it exists.
     */
    where: EnrollmentWhereUniqueInput
    /**
     * In case the Enrollment found by the `where` argument doesn't exist, create a new Enrollment with this data.
     */
    create: XOR<EnrollmentCreateInput, EnrollmentUncheckedCreateInput>
    /**
     * In case the Enrollment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EnrollmentUpdateInput, EnrollmentUncheckedUpdateInput>
  }

  /**
   * Enrollment delete
   */
  export type EnrollmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter which Enrollment to delete.
     */
    where: EnrollmentWhereUniqueInput
  }

  /**
   * Enrollment deleteMany
   */
  export type EnrollmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Enrollments to delete
     */
    where?: EnrollmentWhereInput
    /**
     * Limit how many Enrollments to delete.
     */
    limit?: number
  }

  /**
   * Enrollment without action
   */
  export type EnrollmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
  }


  /**
   * Model Quiz
   */

  export type AggregateQuiz = {
    _count: QuizCountAggregateOutputType | null
    _min: QuizMinAggregateOutputType | null
    _max: QuizMaxAggregateOutputType | null
  }

  export type QuizMinAggregateOutputType = {
    id: string | null
    title: string | null
    type: $Enums.QuizType | null
    courseId: string | null
  }

  export type QuizMaxAggregateOutputType = {
    id: string | null
    title: string | null
    type: $Enums.QuizType | null
    courseId: string | null
  }

  export type QuizCountAggregateOutputType = {
    id: number
    title: number
    type: number
    courseId: number
    _all: number
  }


  export type QuizMinAggregateInputType = {
    id?: true
    title?: true
    type?: true
    courseId?: true
  }

  export type QuizMaxAggregateInputType = {
    id?: true
    title?: true
    type?: true
    courseId?: true
  }

  export type QuizCountAggregateInputType = {
    id?: true
    title?: true
    type?: true
    courseId?: true
    _all?: true
  }

  export type QuizAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Quiz to aggregate.
     */
    where?: QuizWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quizzes to fetch.
     */
    orderBy?: QuizOrderByWithRelationInput | QuizOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuizWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quizzes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quizzes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Quizzes
    **/
    _count?: true | QuizCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuizMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuizMaxAggregateInputType
  }

  export type GetQuizAggregateType<T extends QuizAggregateArgs> = {
        [P in keyof T & keyof AggregateQuiz]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuiz[P]>
      : GetScalarType<T[P], AggregateQuiz[P]>
  }




  export type QuizGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuizWhereInput
    orderBy?: QuizOrderByWithAggregationInput | QuizOrderByWithAggregationInput[]
    by: QuizScalarFieldEnum[] | QuizScalarFieldEnum
    having?: QuizScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuizCountAggregateInputType | true
    _min?: QuizMinAggregateInputType
    _max?: QuizMaxAggregateInputType
  }

  export type QuizGroupByOutputType = {
    id: string
    title: string
    type: $Enums.QuizType
    courseId: string
    _count: QuizCountAggregateOutputType | null
    _min: QuizMinAggregateOutputType | null
    _max: QuizMaxAggregateOutputType | null
  }

  type GetQuizGroupByPayload<T extends QuizGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuizGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuizGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuizGroupByOutputType[P]>
            : GetScalarType<T[P], QuizGroupByOutputType[P]>
        }
      >
    >


  export type QuizSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    type?: boolean
    courseId?: boolean
    course?: boolean | CourseDefaultArgs<ExtArgs>
    questions?: boolean | Quiz$questionsArgs<ExtArgs>
    attempts?: boolean | Quiz$attemptsArgs<ExtArgs>
    _count?: boolean | QuizCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quiz"]>

  export type QuizSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    type?: boolean
    courseId?: boolean
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quiz"]>

  export type QuizSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    type?: boolean
    courseId?: boolean
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quiz"]>

  export type QuizSelectScalar = {
    id?: boolean
    title?: boolean
    type?: boolean
    courseId?: boolean
  }

  export type QuizOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "type" | "courseId", ExtArgs["result"]["quiz"]>
  export type QuizInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | CourseDefaultArgs<ExtArgs>
    questions?: boolean | Quiz$questionsArgs<ExtArgs>
    attempts?: boolean | Quiz$attemptsArgs<ExtArgs>
    _count?: boolean | QuizCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type QuizIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }
  export type QuizIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }

  export type $QuizPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Quiz"
    objects: {
      course: Prisma.$CoursePayload<ExtArgs>
      questions: Prisma.$QuizQuestionPayload<ExtArgs>[]
      attempts: Prisma.$QuizAttemptPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      type: $Enums.QuizType
      courseId: string
    }, ExtArgs["result"]["quiz"]>
    composites: {}
  }

  type QuizGetPayload<S extends boolean | null | undefined | QuizDefaultArgs> = $Result.GetResult<Prisma.$QuizPayload, S>

  type QuizCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QuizFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QuizCountAggregateInputType | true
    }

  export interface QuizDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Quiz'], meta: { name: 'Quiz' } }
    /**
     * Find zero or one Quiz that matches the filter.
     * @param {QuizFindUniqueArgs} args - Arguments to find a Quiz
     * @example
     * // Get one Quiz
     * const quiz = await prisma.quiz.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuizFindUniqueArgs>(args: SelectSubset<T, QuizFindUniqueArgs<ExtArgs>>): Prisma__QuizClient<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Quiz that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QuizFindUniqueOrThrowArgs} args - Arguments to find a Quiz
     * @example
     * // Get one Quiz
     * const quiz = await prisma.quiz.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuizFindUniqueOrThrowArgs>(args: SelectSubset<T, QuizFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuizClient<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Quiz that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizFindFirstArgs} args - Arguments to find a Quiz
     * @example
     * // Get one Quiz
     * const quiz = await prisma.quiz.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuizFindFirstArgs>(args?: SelectSubset<T, QuizFindFirstArgs<ExtArgs>>): Prisma__QuizClient<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Quiz that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizFindFirstOrThrowArgs} args - Arguments to find a Quiz
     * @example
     * // Get one Quiz
     * const quiz = await prisma.quiz.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuizFindFirstOrThrowArgs>(args?: SelectSubset<T, QuizFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuizClient<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Quizzes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Quizzes
     * const quizzes = await prisma.quiz.findMany()
     * 
     * // Get first 10 Quizzes
     * const quizzes = await prisma.quiz.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const quizWithIdOnly = await prisma.quiz.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuizFindManyArgs>(args?: SelectSubset<T, QuizFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Quiz.
     * @param {QuizCreateArgs} args - Arguments to create a Quiz.
     * @example
     * // Create one Quiz
     * const Quiz = await prisma.quiz.create({
     *   data: {
     *     // ... data to create a Quiz
     *   }
     * })
     * 
     */
    create<T extends QuizCreateArgs>(args: SelectSubset<T, QuizCreateArgs<ExtArgs>>): Prisma__QuizClient<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Quizzes.
     * @param {QuizCreateManyArgs} args - Arguments to create many Quizzes.
     * @example
     * // Create many Quizzes
     * const quiz = await prisma.quiz.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuizCreateManyArgs>(args?: SelectSubset<T, QuizCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Quizzes and returns the data saved in the database.
     * @param {QuizCreateManyAndReturnArgs} args - Arguments to create many Quizzes.
     * @example
     * // Create many Quizzes
     * const quiz = await prisma.quiz.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Quizzes and only return the `id`
     * const quizWithIdOnly = await prisma.quiz.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuizCreateManyAndReturnArgs>(args?: SelectSubset<T, QuizCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Quiz.
     * @param {QuizDeleteArgs} args - Arguments to delete one Quiz.
     * @example
     * // Delete one Quiz
     * const Quiz = await prisma.quiz.delete({
     *   where: {
     *     // ... filter to delete one Quiz
     *   }
     * })
     * 
     */
    delete<T extends QuizDeleteArgs>(args: SelectSubset<T, QuizDeleteArgs<ExtArgs>>): Prisma__QuizClient<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Quiz.
     * @param {QuizUpdateArgs} args - Arguments to update one Quiz.
     * @example
     * // Update one Quiz
     * const quiz = await prisma.quiz.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuizUpdateArgs>(args: SelectSubset<T, QuizUpdateArgs<ExtArgs>>): Prisma__QuizClient<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Quizzes.
     * @param {QuizDeleteManyArgs} args - Arguments to filter Quizzes to delete.
     * @example
     * // Delete a few Quizzes
     * const { count } = await prisma.quiz.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuizDeleteManyArgs>(args?: SelectSubset<T, QuizDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Quizzes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Quizzes
     * const quiz = await prisma.quiz.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuizUpdateManyArgs>(args: SelectSubset<T, QuizUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Quizzes and returns the data updated in the database.
     * @param {QuizUpdateManyAndReturnArgs} args - Arguments to update many Quizzes.
     * @example
     * // Update many Quizzes
     * const quiz = await prisma.quiz.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Quizzes and only return the `id`
     * const quizWithIdOnly = await prisma.quiz.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends QuizUpdateManyAndReturnArgs>(args: SelectSubset<T, QuizUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Quiz.
     * @param {QuizUpsertArgs} args - Arguments to update or create a Quiz.
     * @example
     * // Update or create a Quiz
     * const quiz = await prisma.quiz.upsert({
     *   create: {
     *     // ... data to create a Quiz
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Quiz we want to update
     *   }
     * })
     */
    upsert<T extends QuizUpsertArgs>(args: SelectSubset<T, QuizUpsertArgs<ExtArgs>>): Prisma__QuizClient<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Quizzes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizCountArgs} args - Arguments to filter Quizzes to count.
     * @example
     * // Count the number of Quizzes
     * const count = await prisma.quiz.count({
     *   where: {
     *     // ... the filter for the Quizzes we want to count
     *   }
     * })
    **/
    count<T extends QuizCountArgs>(
      args?: Subset<T, QuizCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuizCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Quiz.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QuizAggregateArgs>(args: Subset<T, QuizAggregateArgs>): Prisma.PrismaPromise<GetQuizAggregateType<T>>

    /**
     * Group by Quiz.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QuizGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuizGroupByArgs['orderBy'] }
        : { orderBy?: QuizGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QuizGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuizGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Quiz model
   */
  readonly fields: QuizFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Quiz.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuizClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    course<T extends CourseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CourseDefaultArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    questions<T extends Quiz$questionsArgs<ExtArgs> = {}>(args?: Subset<T, Quiz$questionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    attempts<T extends Quiz$attemptsArgs<ExtArgs> = {}>(args?: Subset<T, Quiz$attemptsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizAttemptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Quiz model
   */
  interface QuizFieldRefs {
    readonly id: FieldRef<"Quiz", 'String'>
    readonly title: FieldRef<"Quiz", 'String'>
    readonly type: FieldRef<"Quiz", 'QuizType'>
    readonly courseId: FieldRef<"Quiz", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Quiz findUnique
   */
  export type QuizFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quiz
     */
    omit?: QuizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizInclude<ExtArgs> | null
    /**
     * Filter, which Quiz to fetch.
     */
    where: QuizWhereUniqueInput
  }

  /**
   * Quiz findUniqueOrThrow
   */
  export type QuizFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quiz
     */
    omit?: QuizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizInclude<ExtArgs> | null
    /**
     * Filter, which Quiz to fetch.
     */
    where: QuizWhereUniqueInput
  }

  /**
   * Quiz findFirst
   */
  export type QuizFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quiz
     */
    omit?: QuizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizInclude<ExtArgs> | null
    /**
     * Filter, which Quiz to fetch.
     */
    where?: QuizWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quizzes to fetch.
     */
    orderBy?: QuizOrderByWithRelationInput | QuizOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Quizzes.
     */
    cursor?: QuizWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quizzes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quizzes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Quizzes.
     */
    distinct?: QuizScalarFieldEnum | QuizScalarFieldEnum[]
  }

  /**
   * Quiz findFirstOrThrow
   */
  export type QuizFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quiz
     */
    omit?: QuizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizInclude<ExtArgs> | null
    /**
     * Filter, which Quiz to fetch.
     */
    where?: QuizWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quizzes to fetch.
     */
    orderBy?: QuizOrderByWithRelationInput | QuizOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Quizzes.
     */
    cursor?: QuizWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quizzes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quizzes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Quizzes.
     */
    distinct?: QuizScalarFieldEnum | QuizScalarFieldEnum[]
  }

  /**
   * Quiz findMany
   */
  export type QuizFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quiz
     */
    omit?: QuizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizInclude<ExtArgs> | null
    /**
     * Filter, which Quizzes to fetch.
     */
    where?: QuizWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quizzes to fetch.
     */
    orderBy?: QuizOrderByWithRelationInput | QuizOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Quizzes.
     */
    cursor?: QuizWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quizzes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quizzes.
     */
    skip?: number
    distinct?: QuizScalarFieldEnum | QuizScalarFieldEnum[]
  }

  /**
   * Quiz create
   */
  export type QuizCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quiz
     */
    omit?: QuizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizInclude<ExtArgs> | null
    /**
     * The data needed to create a Quiz.
     */
    data: XOR<QuizCreateInput, QuizUncheckedCreateInput>
  }

  /**
   * Quiz createMany
   */
  export type QuizCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Quizzes.
     */
    data: QuizCreateManyInput | QuizCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Quiz createManyAndReturn
   */
  export type QuizCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Quiz
     */
    omit?: QuizOmit<ExtArgs> | null
    /**
     * The data used to create many Quizzes.
     */
    data: QuizCreateManyInput | QuizCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Quiz update
   */
  export type QuizUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quiz
     */
    omit?: QuizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizInclude<ExtArgs> | null
    /**
     * The data needed to update a Quiz.
     */
    data: XOR<QuizUpdateInput, QuizUncheckedUpdateInput>
    /**
     * Choose, which Quiz to update.
     */
    where: QuizWhereUniqueInput
  }

  /**
   * Quiz updateMany
   */
  export type QuizUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Quizzes.
     */
    data: XOR<QuizUpdateManyMutationInput, QuizUncheckedUpdateManyInput>
    /**
     * Filter which Quizzes to update
     */
    where?: QuizWhereInput
    /**
     * Limit how many Quizzes to update.
     */
    limit?: number
  }

  /**
   * Quiz updateManyAndReturn
   */
  export type QuizUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Quiz
     */
    omit?: QuizOmit<ExtArgs> | null
    /**
     * The data used to update Quizzes.
     */
    data: XOR<QuizUpdateManyMutationInput, QuizUncheckedUpdateManyInput>
    /**
     * Filter which Quizzes to update
     */
    where?: QuizWhereInput
    /**
     * Limit how many Quizzes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Quiz upsert
   */
  export type QuizUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quiz
     */
    omit?: QuizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizInclude<ExtArgs> | null
    /**
     * The filter to search for the Quiz to update in case it exists.
     */
    where: QuizWhereUniqueInput
    /**
     * In case the Quiz found by the `where` argument doesn't exist, create a new Quiz with this data.
     */
    create: XOR<QuizCreateInput, QuizUncheckedCreateInput>
    /**
     * In case the Quiz was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuizUpdateInput, QuizUncheckedUpdateInput>
  }

  /**
   * Quiz delete
   */
  export type QuizDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quiz
     */
    omit?: QuizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizInclude<ExtArgs> | null
    /**
     * Filter which Quiz to delete.
     */
    where: QuizWhereUniqueInput
  }

  /**
   * Quiz deleteMany
   */
  export type QuizDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Quizzes to delete
     */
    where?: QuizWhereInput
    /**
     * Limit how many Quizzes to delete.
     */
    limit?: number
  }

  /**
   * Quiz.questions
   */
  export type Quiz$questionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionInclude<ExtArgs> | null
    where?: QuizQuestionWhereInput
    orderBy?: QuizQuestionOrderByWithRelationInput | QuizQuestionOrderByWithRelationInput[]
    cursor?: QuizQuestionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuizQuestionScalarFieldEnum | QuizQuestionScalarFieldEnum[]
  }

  /**
   * Quiz.attempts
   */
  export type Quiz$attemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAttempt
     */
    select?: QuizAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizAttempt
     */
    omit?: QuizAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAttemptInclude<ExtArgs> | null
    where?: QuizAttemptWhereInput
    orderBy?: QuizAttemptOrderByWithRelationInput | QuizAttemptOrderByWithRelationInput[]
    cursor?: QuizAttemptWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuizAttemptScalarFieldEnum | QuizAttemptScalarFieldEnum[]
  }

  /**
   * Quiz without action
   */
  export type QuizDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quiz
     */
    omit?: QuizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizInclude<ExtArgs> | null
  }


  /**
   * Model QuizQuestion
   */

  export type AggregateQuizQuestion = {
    _count: QuizQuestionCountAggregateOutputType | null
    _min: QuizQuestionMinAggregateOutputType | null
    _max: QuizQuestionMaxAggregateOutputType | null
  }

  export type QuizQuestionMinAggregateOutputType = {
    id: string | null
    quizId: string | null
    questionText: string | null
    correctAnswer: string | null
  }

  export type QuizQuestionMaxAggregateOutputType = {
    id: string | null
    quizId: string | null
    questionText: string | null
    correctAnswer: string | null
  }

  export type QuizQuestionCountAggregateOutputType = {
    id: number
    quizId: number
    questionText: number
    options: number
    correctAnswer: number
    _all: number
  }


  export type QuizQuestionMinAggregateInputType = {
    id?: true
    quizId?: true
    questionText?: true
    correctAnswer?: true
  }

  export type QuizQuestionMaxAggregateInputType = {
    id?: true
    quizId?: true
    questionText?: true
    correctAnswer?: true
  }

  export type QuizQuestionCountAggregateInputType = {
    id?: true
    quizId?: true
    questionText?: true
    options?: true
    correctAnswer?: true
    _all?: true
  }

  export type QuizQuestionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuizQuestion to aggregate.
     */
    where?: QuizQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizQuestions to fetch.
     */
    orderBy?: QuizQuestionOrderByWithRelationInput | QuizQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuizQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizQuestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QuizQuestions
    **/
    _count?: true | QuizQuestionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuizQuestionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuizQuestionMaxAggregateInputType
  }

  export type GetQuizQuestionAggregateType<T extends QuizQuestionAggregateArgs> = {
        [P in keyof T & keyof AggregateQuizQuestion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuizQuestion[P]>
      : GetScalarType<T[P], AggregateQuizQuestion[P]>
  }




  export type QuizQuestionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuizQuestionWhereInput
    orderBy?: QuizQuestionOrderByWithAggregationInput | QuizQuestionOrderByWithAggregationInput[]
    by: QuizQuestionScalarFieldEnum[] | QuizQuestionScalarFieldEnum
    having?: QuizQuestionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuizQuestionCountAggregateInputType | true
    _min?: QuizQuestionMinAggregateInputType
    _max?: QuizQuestionMaxAggregateInputType
  }

  export type QuizQuestionGroupByOutputType = {
    id: string
    quizId: string
    questionText: string
    options: string[]
    correctAnswer: string
    _count: QuizQuestionCountAggregateOutputType | null
    _min: QuizQuestionMinAggregateOutputType | null
    _max: QuizQuestionMaxAggregateOutputType | null
  }

  type GetQuizQuestionGroupByPayload<T extends QuizQuestionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuizQuestionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuizQuestionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuizQuestionGroupByOutputType[P]>
            : GetScalarType<T[P], QuizQuestionGroupByOutputType[P]>
        }
      >
    >


  export type QuizQuestionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quizId?: boolean
    questionText?: boolean
    options?: boolean
    correctAnswer?: boolean
    quiz?: boolean | QuizDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quizQuestion"]>

  export type QuizQuestionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quizId?: boolean
    questionText?: boolean
    options?: boolean
    correctAnswer?: boolean
    quiz?: boolean | QuizDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quizQuestion"]>

  export type QuizQuestionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quizId?: boolean
    questionText?: boolean
    options?: boolean
    correctAnswer?: boolean
    quiz?: boolean | QuizDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quizQuestion"]>

  export type QuizQuestionSelectScalar = {
    id?: boolean
    quizId?: boolean
    questionText?: boolean
    options?: boolean
    correctAnswer?: boolean
  }

  export type QuizQuestionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "quizId" | "questionText" | "options" | "correctAnswer", ExtArgs["result"]["quizQuestion"]>
  export type QuizQuestionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quiz?: boolean | QuizDefaultArgs<ExtArgs>
  }
  export type QuizQuestionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quiz?: boolean | QuizDefaultArgs<ExtArgs>
  }
  export type QuizQuestionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quiz?: boolean | QuizDefaultArgs<ExtArgs>
  }

  export type $QuizQuestionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QuizQuestion"
    objects: {
      quiz: Prisma.$QuizPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      quizId: string
      questionText: string
      options: string[]
      correctAnswer: string
    }, ExtArgs["result"]["quizQuestion"]>
    composites: {}
  }

  type QuizQuestionGetPayload<S extends boolean | null | undefined | QuizQuestionDefaultArgs> = $Result.GetResult<Prisma.$QuizQuestionPayload, S>

  type QuizQuestionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QuizQuestionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QuizQuestionCountAggregateInputType | true
    }

  export interface QuizQuestionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QuizQuestion'], meta: { name: 'QuizQuestion' } }
    /**
     * Find zero or one QuizQuestion that matches the filter.
     * @param {QuizQuestionFindUniqueArgs} args - Arguments to find a QuizQuestion
     * @example
     * // Get one QuizQuestion
     * const quizQuestion = await prisma.quizQuestion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuizQuestionFindUniqueArgs>(args: SelectSubset<T, QuizQuestionFindUniqueArgs<ExtArgs>>): Prisma__QuizQuestionClient<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one QuizQuestion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QuizQuestionFindUniqueOrThrowArgs} args - Arguments to find a QuizQuestion
     * @example
     * // Get one QuizQuestion
     * const quizQuestion = await prisma.quizQuestion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuizQuestionFindUniqueOrThrowArgs>(args: SelectSubset<T, QuizQuestionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuizQuestionClient<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QuizQuestion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizQuestionFindFirstArgs} args - Arguments to find a QuizQuestion
     * @example
     * // Get one QuizQuestion
     * const quizQuestion = await prisma.quizQuestion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuizQuestionFindFirstArgs>(args?: SelectSubset<T, QuizQuestionFindFirstArgs<ExtArgs>>): Prisma__QuizQuestionClient<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QuizQuestion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizQuestionFindFirstOrThrowArgs} args - Arguments to find a QuizQuestion
     * @example
     * // Get one QuizQuestion
     * const quizQuestion = await prisma.quizQuestion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuizQuestionFindFirstOrThrowArgs>(args?: SelectSubset<T, QuizQuestionFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuizQuestionClient<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more QuizQuestions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizQuestionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QuizQuestions
     * const quizQuestions = await prisma.quizQuestion.findMany()
     * 
     * // Get first 10 QuizQuestions
     * const quizQuestions = await prisma.quizQuestion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const quizQuestionWithIdOnly = await prisma.quizQuestion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuizQuestionFindManyArgs>(args?: SelectSubset<T, QuizQuestionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a QuizQuestion.
     * @param {QuizQuestionCreateArgs} args - Arguments to create a QuizQuestion.
     * @example
     * // Create one QuizQuestion
     * const QuizQuestion = await prisma.quizQuestion.create({
     *   data: {
     *     // ... data to create a QuizQuestion
     *   }
     * })
     * 
     */
    create<T extends QuizQuestionCreateArgs>(args: SelectSubset<T, QuizQuestionCreateArgs<ExtArgs>>): Prisma__QuizQuestionClient<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many QuizQuestions.
     * @param {QuizQuestionCreateManyArgs} args - Arguments to create many QuizQuestions.
     * @example
     * // Create many QuizQuestions
     * const quizQuestion = await prisma.quizQuestion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuizQuestionCreateManyArgs>(args?: SelectSubset<T, QuizQuestionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many QuizQuestions and returns the data saved in the database.
     * @param {QuizQuestionCreateManyAndReturnArgs} args - Arguments to create many QuizQuestions.
     * @example
     * // Create many QuizQuestions
     * const quizQuestion = await prisma.quizQuestion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many QuizQuestions and only return the `id`
     * const quizQuestionWithIdOnly = await prisma.quizQuestion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuizQuestionCreateManyAndReturnArgs>(args?: SelectSubset<T, QuizQuestionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a QuizQuestion.
     * @param {QuizQuestionDeleteArgs} args - Arguments to delete one QuizQuestion.
     * @example
     * // Delete one QuizQuestion
     * const QuizQuestion = await prisma.quizQuestion.delete({
     *   where: {
     *     // ... filter to delete one QuizQuestion
     *   }
     * })
     * 
     */
    delete<T extends QuizQuestionDeleteArgs>(args: SelectSubset<T, QuizQuestionDeleteArgs<ExtArgs>>): Prisma__QuizQuestionClient<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one QuizQuestion.
     * @param {QuizQuestionUpdateArgs} args - Arguments to update one QuizQuestion.
     * @example
     * // Update one QuizQuestion
     * const quizQuestion = await prisma.quizQuestion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuizQuestionUpdateArgs>(args: SelectSubset<T, QuizQuestionUpdateArgs<ExtArgs>>): Prisma__QuizQuestionClient<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more QuizQuestions.
     * @param {QuizQuestionDeleteManyArgs} args - Arguments to filter QuizQuestions to delete.
     * @example
     * // Delete a few QuizQuestions
     * const { count } = await prisma.quizQuestion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuizQuestionDeleteManyArgs>(args?: SelectSubset<T, QuizQuestionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuizQuestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizQuestionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QuizQuestions
     * const quizQuestion = await prisma.quizQuestion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuizQuestionUpdateManyArgs>(args: SelectSubset<T, QuizQuestionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuizQuestions and returns the data updated in the database.
     * @param {QuizQuestionUpdateManyAndReturnArgs} args - Arguments to update many QuizQuestions.
     * @example
     * // Update many QuizQuestions
     * const quizQuestion = await prisma.quizQuestion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more QuizQuestions and only return the `id`
     * const quizQuestionWithIdOnly = await prisma.quizQuestion.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends QuizQuestionUpdateManyAndReturnArgs>(args: SelectSubset<T, QuizQuestionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one QuizQuestion.
     * @param {QuizQuestionUpsertArgs} args - Arguments to update or create a QuizQuestion.
     * @example
     * // Update or create a QuizQuestion
     * const quizQuestion = await prisma.quizQuestion.upsert({
     *   create: {
     *     // ... data to create a QuizQuestion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QuizQuestion we want to update
     *   }
     * })
     */
    upsert<T extends QuizQuestionUpsertArgs>(args: SelectSubset<T, QuizQuestionUpsertArgs<ExtArgs>>): Prisma__QuizQuestionClient<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of QuizQuestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizQuestionCountArgs} args - Arguments to filter QuizQuestions to count.
     * @example
     * // Count the number of QuizQuestions
     * const count = await prisma.quizQuestion.count({
     *   where: {
     *     // ... the filter for the QuizQuestions we want to count
     *   }
     * })
    **/
    count<T extends QuizQuestionCountArgs>(
      args?: Subset<T, QuizQuestionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuizQuestionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QuizQuestion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizQuestionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QuizQuestionAggregateArgs>(args: Subset<T, QuizQuestionAggregateArgs>): Prisma.PrismaPromise<GetQuizQuestionAggregateType<T>>

    /**
     * Group by QuizQuestion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizQuestionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QuizQuestionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuizQuestionGroupByArgs['orderBy'] }
        : { orderBy?: QuizQuestionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QuizQuestionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuizQuestionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QuizQuestion model
   */
  readonly fields: QuizQuestionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QuizQuestion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuizQuestionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    quiz<T extends QuizDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QuizDefaultArgs<ExtArgs>>): Prisma__QuizClient<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the QuizQuestion model
   */
  interface QuizQuestionFieldRefs {
    readonly id: FieldRef<"QuizQuestion", 'String'>
    readonly quizId: FieldRef<"QuizQuestion", 'String'>
    readonly questionText: FieldRef<"QuizQuestion", 'String'>
    readonly options: FieldRef<"QuizQuestion", 'String[]'>
    readonly correctAnswer: FieldRef<"QuizQuestion", 'String'>
  }
    

  // Custom InputTypes
  /**
   * QuizQuestion findUnique
   */
  export type QuizQuestionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionInclude<ExtArgs> | null
    /**
     * Filter, which QuizQuestion to fetch.
     */
    where: QuizQuestionWhereUniqueInput
  }

  /**
   * QuizQuestion findUniqueOrThrow
   */
  export type QuizQuestionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionInclude<ExtArgs> | null
    /**
     * Filter, which QuizQuestion to fetch.
     */
    where: QuizQuestionWhereUniqueInput
  }

  /**
   * QuizQuestion findFirst
   */
  export type QuizQuestionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionInclude<ExtArgs> | null
    /**
     * Filter, which QuizQuestion to fetch.
     */
    where?: QuizQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizQuestions to fetch.
     */
    orderBy?: QuizQuestionOrderByWithRelationInput | QuizQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuizQuestions.
     */
    cursor?: QuizQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizQuestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuizQuestions.
     */
    distinct?: QuizQuestionScalarFieldEnum | QuizQuestionScalarFieldEnum[]
  }

  /**
   * QuizQuestion findFirstOrThrow
   */
  export type QuizQuestionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionInclude<ExtArgs> | null
    /**
     * Filter, which QuizQuestion to fetch.
     */
    where?: QuizQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizQuestions to fetch.
     */
    orderBy?: QuizQuestionOrderByWithRelationInput | QuizQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuizQuestions.
     */
    cursor?: QuizQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizQuestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuizQuestions.
     */
    distinct?: QuizQuestionScalarFieldEnum | QuizQuestionScalarFieldEnum[]
  }

  /**
   * QuizQuestion findMany
   */
  export type QuizQuestionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionInclude<ExtArgs> | null
    /**
     * Filter, which QuizQuestions to fetch.
     */
    where?: QuizQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizQuestions to fetch.
     */
    orderBy?: QuizQuestionOrderByWithRelationInput | QuizQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QuizQuestions.
     */
    cursor?: QuizQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizQuestions.
     */
    skip?: number
    distinct?: QuizQuestionScalarFieldEnum | QuizQuestionScalarFieldEnum[]
  }

  /**
   * QuizQuestion create
   */
  export type QuizQuestionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionInclude<ExtArgs> | null
    /**
     * The data needed to create a QuizQuestion.
     */
    data: XOR<QuizQuestionCreateInput, QuizQuestionUncheckedCreateInput>
  }

  /**
   * QuizQuestion createMany
   */
  export type QuizQuestionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QuizQuestions.
     */
    data: QuizQuestionCreateManyInput | QuizQuestionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QuizQuestion createManyAndReturn
   */
  export type QuizQuestionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * The data used to create many QuizQuestions.
     */
    data: QuizQuestionCreateManyInput | QuizQuestionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * QuizQuestion update
   */
  export type QuizQuestionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionInclude<ExtArgs> | null
    /**
     * The data needed to update a QuizQuestion.
     */
    data: XOR<QuizQuestionUpdateInput, QuizQuestionUncheckedUpdateInput>
    /**
     * Choose, which QuizQuestion to update.
     */
    where: QuizQuestionWhereUniqueInput
  }

  /**
   * QuizQuestion updateMany
   */
  export type QuizQuestionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QuizQuestions.
     */
    data: XOR<QuizQuestionUpdateManyMutationInput, QuizQuestionUncheckedUpdateManyInput>
    /**
     * Filter which QuizQuestions to update
     */
    where?: QuizQuestionWhereInput
    /**
     * Limit how many QuizQuestions to update.
     */
    limit?: number
  }

  /**
   * QuizQuestion updateManyAndReturn
   */
  export type QuizQuestionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * The data used to update QuizQuestions.
     */
    data: XOR<QuizQuestionUpdateManyMutationInput, QuizQuestionUncheckedUpdateManyInput>
    /**
     * Filter which QuizQuestions to update
     */
    where?: QuizQuestionWhereInput
    /**
     * Limit how many QuizQuestions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * QuizQuestion upsert
   */
  export type QuizQuestionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionInclude<ExtArgs> | null
    /**
     * The filter to search for the QuizQuestion to update in case it exists.
     */
    where: QuizQuestionWhereUniqueInput
    /**
     * In case the QuizQuestion found by the `where` argument doesn't exist, create a new QuizQuestion with this data.
     */
    create: XOR<QuizQuestionCreateInput, QuizQuestionUncheckedCreateInput>
    /**
     * In case the QuizQuestion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuizQuestionUpdateInput, QuizQuestionUncheckedUpdateInput>
  }

  /**
   * QuizQuestion delete
   */
  export type QuizQuestionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionInclude<ExtArgs> | null
    /**
     * Filter which QuizQuestion to delete.
     */
    where: QuizQuestionWhereUniqueInput
  }

  /**
   * QuizQuestion deleteMany
   */
  export type QuizQuestionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuizQuestions to delete
     */
    where?: QuizQuestionWhereInput
    /**
     * Limit how many QuizQuestions to delete.
     */
    limit?: number
  }

  /**
   * QuizQuestion without action
   */
  export type QuizQuestionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionInclude<ExtArgs> | null
  }


  /**
   * Model QuizAttempt
   */

  export type AggregateQuizAttempt = {
    _count: QuizAttemptCountAggregateOutputType | null
    _avg: QuizAttemptAvgAggregateOutputType | null
    _sum: QuizAttemptSumAggregateOutputType | null
    _min: QuizAttemptMinAggregateOutputType | null
    _max: QuizAttemptMaxAggregateOutputType | null
  }

  export type QuizAttemptAvgAggregateOutputType = {
    score: number | null
  }

  export type QuizAttemptSumAggregateOutputType = {
    score: number | null
  }

  export type QuizAttemptMinAggregateOutputType = {
    id: string | null
    studentId: string | null
    quizId: string | null
    score: number | null
    submittedAt: Date | null
  }

  export type QuizAttemptMaxAggregateOutputType = {
    id: string | null
    studentId: string | null
    quizId: string | null
    score: number | null
    submittedAt: Date | null
  }

  export type QuizAttemptCountAggregateOutputType = {
    id: number
    studentId: number
    quizId: number
    score: number
    answers: number
    submittedAt: number
    _all: number
  }


  export type QuizAttemptAvgAggregateInputType = {
    score?: true
  }

  export type QuizAttemptSumAggregateInputType = {
    score?: true
  }

  export type QuizAttemptMinAggregateInputType = {
    id?: true
    studentId?: true
    quizId?: true
    score?: true
    submittedAt?: true
  }

  export type QuizAttemptMaxAggregateInputType = {
    id?: true
    studentId?: true
    quizId?: true
    score?: true
    submittedAt?: true
  }

  export type QuizAttemptCountAggregateInputType = {
    id?: true
    studentId?: true
    quizId?: true
    score?: true
    answers?: true
    submittedAt?: true
    _all?: true
  }

  export type QuizAttemptAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuizAttempt to aggregate.
     */
    where?: QuizAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizAttempts to fetch.
     */
    orderBy?: QuizAttemptOrderByWithRelationInput | QuizAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuizAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QuizAttempts
    **/
    _count?: true | QuizAttemptCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QuizAttemptAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QuizAttemptSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuizAttemptMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuizAttemptMaxAggregateInputType
  }

  export type GetQuizAttemptAggregateType<T extends QuizAttemptAggregateArgs> = {
        [P in keyof T & keyof AggregateQuizAttempt]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuizAttempt[P]>
      : GetScalarType<T[P], AggregateQuizAttempt[P]>
  }




  export type QuizAttemptGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuizAttemptWhereInput
    orderBy?: QuizAttemptOrderByWithAggregationInput | QuizAttemptOrderByWithAggregationInput[]
    by: QuizAttemptScalarFieldEnum[] | QuizAttemptScalarFieldEnum
    having?: QuizAttemptScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuizAttemptCountAggregateInputType | true
    _avg?: QuizAttemptAvgAggregateInputType
    _sum?: QuizAttemptSumAggregateInputType
    _min?: QuizAttemptMinAggregateInputType
    _max?: QuizAttemptMaxAggregateInputType
  }

  export type QuizAttemptGroupByOutputType = {
    id: string
    studentId: string
    quizId: string
    score: number
    answers: string[]
    submittedAt: Date
    _count: QuizAttemptCountAggregateOutputType | null
    _avg: QuizAttemptAvgAggregateOutputType | null
    _sum: QuizAttemptSumAggregateOutputType | null
    _min: QuizAttemptMinAggregateOutputType | null
    _max: QuizAttemptMaxAggregateOutputType | null
  }

  type GetQuizAttemptGroupByPayload<T extends QuizAttemptGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuizAttemptGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuizAttemptGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuizAttemptGroupByOutputType[P]>
            : GetScalarType<T[P], QuizAttemptGroupByOutputType[P]>
        }
      >
    >


  export type QuizAttemptSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    quizId?: boolean
    score?: boolean
    answers?: boolean
    submittedAt?: boolean
    student?: boolean | UserDefaultArgs<ExtArgs>
    quiz?: boolean | QuizDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quizAttempt"]>

  export type QuizAttemptSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    quizId?: boolean
    score?: boolean
    answers?: boolean
    submittedAt?: boolean
    student?: boolean | UserDefaultArgs<ExtArgs>
    quiz?: boolean | QuizDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quizAttempt"]>

  export type QuizAttemptSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    quizId?: boolean
    score?: boolean
    answers?: boolean
    submittedAt?: boolean
    student?: boolean | UserDefaultArgs<ExtArgs>
    quiz?: boolean | QuizDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quizAttempt"]>

  export type QuizAttemptSelectScalar = {
    id?: boolean
    studentId?: boolean
    quizId?: boolean
    score?: boolean
    answers?: boolean
    submittedAt?: boolean
  }

  export type QuizAttemptOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentId" | "quizId" | "score" | "answers" | "submittedAt", ExtArgs["result"]["quizAttempt"]>
  export type QuizAttemptInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | UserDefaultArgs<ExtArgs>
    quiz?: boolean | QuizDefaultArgs<ExtArgs>
  }
  export type QuizAttemptIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | UserDefaultArgs<ExtArgs>
    quiz?: boolean | QuizDefaultArgs<ExtArgs>
  }
  export type QuizAttemptIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | UserDefaultArgs<ExtArgs>
    quiz?: boolean | QuizDefaultArgs<ExtArgs>
  }

  export type $QuizAttemptPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QuizAttempt"
    objects: {
      student: Prisma.$UserPayload<ExtArgs>
      quiz: Prisma.$QuizPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      studentId: string
      quizId: string
      score: number
      answers: string[]
      submittedAt: Date
    }, ExtArgs["result"]["quizAttempt"]>
    composites: {}
  }

  type QuizAttemptGetPayload<S extends boolean | null | undefined | QuizAttemptDefaultArgs> = $Result.GetResult<Prisma.$QuizAttemptPayload, S>

  type QuizAttemptCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QuizAttemptFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QuizAttemptCountAggregateInputType | true
    }

  export interface QuizAttemptDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QuizAttempt'], meta: { name: 'QuizAttempt' } }
    /**
     * Find zero or one QuizAttempt that matches the filter.
     * @param {QuizAttemptFindUniqueArgs} args - Arguments to find a QuizAttempt
     * @example
     * // Get one QuizAttempt
     * const quizAttempt = await prisma.quizAttempt.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuizAttemptFindUniqueArgs>(args: SelectSubset<T, QuizAttemptFindUniqueArgs<ExtArgs>>): Prisma__QuizAttemptClient<$Result.GetResult<Prisma.$QuizAttemptPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one QuizAttempt that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QuizAttemptFindUniqueOrThrowArgs} args - Arguments to find a QuizAttempt
     * @example
     * // Get one QuizAttempt
     * const quizAttempt = await prisma.quizAttempt.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuizAttemptFindUniqueOrThrowArgs>(args: SelectSubset<T, QuizAttemptFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuizAttemptClient<$Result.GetResult<Prisma.$QuizAttemptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QuizAttempt that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizAttemptFindFirstArgs} args - Arguments to find a QuizAttempt
     * @example
     * // Get one QuizAttempt
     * const quizAttempt = await prisma.quizAttempt.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuizAttemptFindFirstArgs>(args?: SelectSubset<T, QuizAttemptFindFirstArgs<ExtArgs>>): Prisma__QuizAttemptClient<$Result.GetResult<Prisma.$QuizAttemptPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QuizAttempt that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizAttemptFindFirstOrThrowArgs} args - Arguments to find a QuizAttempt
     * @example
     * // Get one QuizAttempt
     * const quizAttempt = await prisma.quizAttempt.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuizAttemptFindFirstOrThrowArgs>(args?: SelectSubset<T, QuizAttemptFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuizAttemptClient<$Result.GetResult<Prisma.$QuizAttemptPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more QuizAttempts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizAttemptFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QuizAttempts
     * const quizAttempts = await prisma.quizAttempt.findMany()
     * 
     * // Get first 10 QuizAttempts
     * const quizAttempts = await prisma.quizAttempt.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const quizAttemptWithIdOnly = await prisma.quizAttempt.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuizAttemptFindManyArgs>(args?: SelectSubset<T, QuizAttemptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizAttemptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a QuizAttempt.
     * @param {QuizAttemptCreateArgs} args - Arguments to create a QuizAttempt.
     * @example
     * // Create one QuizAttempt
     * const QuizAttempt = await prisma.quizAttempt.create({
     *   data: {
     *     // ... data to create a QuizAttempt
     *   }
     * })
     * 
     */
    create<T extends QuizAttemptCreateArgs>(args: SelectSubset<T, QuizAttemptCreateArgs<ExtArgs>>): Prisma__QuizAttemptClient<$Result.GetResult<Prisma.$QuizAttemptPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many QuizAttempts.
     * @param {QuizAttemptCreateManyArgs} args - Arguments to create many QuizAttempts.
     * @example
     * // Create many QuizAttempts
     * const quizAttempt = await prisma.quizAttempt.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuizAttemptCreateManyArgs>(args?: SelectSubset<T, QuizAttemptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many QuizAttempts and returns the data saved in the database.
     * @param {QuizAttemptCreateManyAndReturnArgs} args - Arguments to create many QuizAttempts.
     * @example
     * // Create many QuizAttempts
     * const quizAttempt = await prisma.quizAttempt.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many QuizAttempts and only return the `id`
     * const quizAttemptWithIdOnly = await prisma.quizAttempt.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuizAttemptCreateManyAndReturnArgs>(args?: SelectSubset<T, QuizAttemptCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizAttemptPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a QuizAttempt.
     * @param {QuizAttemptDeleteArgs} args - Arguments to delete one QuizAttempt.
     * @example
     * // Delete one QuizAttempt
     * const QuizAttempt = await prisma.quizAttempt.delete({
     *   where: {
     *     // ... filter to delete one QuizAttempt
     *   }
     * })
     * 
     */
    delete<T extends QuizAttemptDeleteArgs>(args: SelectSubset<T, QuizAttemptDeleteArgs<ExtArgs>>): Prisma__QuizAttemptClient<$Result.GetResult<Prisma.$QuizAttemptPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one QuizAttempt.
     * @param {QuizAttemptUpdateArgs} args - Arguments to update one QuizAttempt.
     * @example
     * // Update one QuizAttempt
     * const quizAttempt = await prisma.quizAttempt.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuizAttemptUpdateArgs>(args: SelectSubset<T, QuizAttemptUpdateArgs<ExtArgs>>): Prisma__QuizAttemptClient<$Result.GetResult<Prisma.$QuizAttemptPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more QuizAttempts.
     * @param {QuizAttemptDeleteManyArgs} args - Arguments to filter QuizAttempts to delete.
     * @example
     * // Delete a few QuizAttempts
     * const { count } = await prisma.quizAttempt.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuizAttemptDeleteManyArgs>(args?: SelectSubset<T, QuizAttemptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuizAttempts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizAttemptUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QuizAttempts
     * const quizAttempt = await prisma.quizAttempt.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuizAttemptUpdateManyArgs>(args: SelectSubset<T, QuizAttemptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuizAttempts and returns the data updated in the database.
     * @param {QuizAttemptUpdateManyAndReturnArgs} args - Arguments to update many QuizAttempts.
     * @example
     * // Update many QuizAttempts
     * const quizAttempt = await prisma.quizAttempt.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more QuizAttempts and only return the `id`
     * const quizAttemptWithIdOnly = await prisma.quizAttempt.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends QuizAttemptUpdateManyAndReturnArgs>(args: SelectSubset<T, QuizAttemptUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizAttemptPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one QuizAttempt.
     * @param {QuizAttemptUpsertArgs} args - Arguments to update or create a QuizAttempt.
     * @example
     * // Update or create a QuizAttempt
     * const quizAttempt = await prisma.quizAttempt.upsert({
     *   create: {
     *     // ... data to create a QuizAttempt
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QuizAttempt we want to update
     *   }
     * })
     */
    upsert<T extends QuizAttemptUpsertArgs>(args: SelectSubset<T, QuizAttemptUpsertArgs<ExtArgs>>): Prisma__QuizAttemptClient<$Result.GetResult<Prisma.$QuizAttemptPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of QuizAttempts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizAttemptCountArgs} args - Arguments to filter QuizAttempts to count.
     * @example
     * // Count the number of QuizAttempts
     * const count = await prisma.quizAttempt.count({
     *   where: {
     *     // ... the filter for the QuizAttempts we want to count
     *   }
     * })
    **/
    count<T extends QuizAttemptCountArgs>(
      args?: Subset<T, QuizAttemptCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuizAttemptCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QuizAttempt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizAttemptAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QuizAttemptAggregateArgs>(args: Subset<T, QuizAttemptAggregateArgs>): Prisma.PrismaPromise<GetQuizAttemptAggregateType<T>>

    /**
     * Group by QuizAttempt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizAttemptGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QuizAttemptGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuizAttemptGroupByArgs['orderBy'] }
        : { orderBy?: QuizAttemptGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QuizAttemptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuizAttemptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QuizAttempt model
   */
  readonly fields: QuizAttemptFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QuizAttempt.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuizAttemptClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    quiz<T extends QuizDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QuizDefaultArgs<ExtArgs>>): Prisma__QuizClient<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the QuizAttempt model
   */
  interface QuizAttemptFieldRefs {
    readonly id: FieldRef<"QuizAttempt", 'String'>
    readonly studentId: FieldRef<"QuizAttempt", 'String'>
    readonly quizId: FieldRef<"QuizAttempt", 'String'>
    readonly score: FieldRef<"QuizAttempt", 'Float'>
    readonly answers: FieldRef<"QuizAttempt", 'String[]'>
    readonly submittedAt: FieldRef<"QuizAttempt", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * QuizAttempt findUnique
   */
  export type QuizAttemptFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAttempt
     */
    select?: QuizAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizAttempt
     */
    omit?: QuizAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAttemptInclude<ExtArgs> | null
    /**
     * Filter, which QuizAttempt to fetch.
     */
    where: QuizAttemptWhereUniqueInput
  }

  /**
   * QuizAttempt findUniqueOrThrow
   */
  export type QuizAttemptFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAttempt
     */
    select?: QuizAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizAttempt
     */
    omit?: QuizAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAttemptInclude<ExtArgs> | null
    /**
     * Filter, which QuizAttempt to fetch.
     */
    where: QuizAttemptWhereUniqueInput
  }

  /**
   * QuizAttempt findFirst
   */
  export type QuizAttemptFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAttempt
     */
    select?: QuizAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizAttempt
     */
    omit?: QuizAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAttemptInclude<ExtArgs> | null
    /**
     * Filter, which QuizAttempt to fetch.
     */
    where?: QuizAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizAttempts to fetch.
     */
    orderBy?: QuizAttemptOrderByWithRelationInput | QuizAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuizAttempts.
     */
    cursor?: QuizAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuizAttempts.
     */
    distinct?: QuizAttemptScalarFieldEnum | QuizAttemptScalarFieldEnum[]
  }

  /**
   * QuizAttempt findFirstOrThrow
   */
  export type QuizAttemptFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAttempt
     */
    select?: QuizAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizAttempt
     */
    omit?: QuizAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAttemptInclude<ExtArgs> | null
    /**
     * Filter, which QuizAttempt to fetch.
     */
    where?: QuizAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizAttempts to fetch.
     */
    orderBy?: QuizAttemptOrderByWithRelationInput | QuizAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuizAttempts.
     */
    cursor?: QuizAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuizAttempts.
     */
    distinct?: QuizAttemptScalarFieldEnum | QuizAttemptScalarFieldEnum[]
  }

  /**
   * QuizAttempt findMany
   */
  export type QuizAttemptFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAttempt
     */
    select?: QuizAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizAttempt
     */
    omit?: QuizAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAttemptInclude<ExtArgs> | null
    /**
     * Filter, which QuizAttempts to fetch.
     */
    where?: QuizAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizAttempts to fetch.
     */
    orderBy?: QuizAttemptOrderByWithRelationInput | QuizAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QuizAttempts.
     */
    cursor?: QuizAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizAttempts.
     */
    skip?: number
    distinct?: QuizAttemptScalarFieldEnum | QuizAttemptScalarFieldEnum[]
  }

  /**
   * QuizAttempt create
   */
  export type QuizAttemptCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAttempt
     */
    select?: QuizAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizAttempt
     */
    omit?: QuizAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAttemptInclude<ExtArgs> | null
    /**
     * The data needed to create a QuizAttempt.
     */
    data: XOR<QuizAttemptCreateInput, QuizAttemptUncheckedCreateInput>
  }

  /**
   * QuizAttempt createMany
   */
  export type QuizAttemptCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QuizAttempts.
     */
    data: QuizAttemptCreateManyInput | QuizAttemptCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QuizAttempt createManyAndReturn
   */
  export type QuizAttemptCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAttempt
     */
    select?: QuizAttemptSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QuizAttempt
     */
    omit?: QuizAttemptOmit<ExtArgs> | null
    /**
     * The data used to create many QuizAttempts.
     */
    data: QuizAttemptCreateManyInput | QuizAttemptCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAttemptIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * QuizAttempt update
   */
  export type QuizAttemptUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAttempt
     */
    select?: QuizAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizAttempt
     */
    omit?: QuizAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAttemptInclude<ExtArgs> | null
    /**
     * The data needed to update a QuizAttempt.
     */
    data: XOR<QuizAttemptUpdateInput, QuizAttemptUncheckedUpdateInput>
    /**
     * Choose, which QuizAttempt to update.
     */
    where: QuizAttemptWhereUniqueInput
  }

  /**
   * QuizAttempt updateMany
   */
  export type QuizAttemptUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QuizAttempts.
     */
    data: XOR<QuizAttemptUpdateManyMutationInput, QuizAttemptUncheckedUpdateManyInput>
    /**
     * Filter which QuizAttempts to update
     */
    where?: QuizAttemptWhereInput
    /**
     * Limit how many QuizAttempts to update.
     */
    limit?: number
  }

  /**
   * QuizAttempt updateManyAndReturn
   */
  export type QuizAttemptUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAttempt
     */
    select?: QuizAttemptSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QuizAttempt
     */
    omit?: QuizAttemptOmit<ExtArgs> | null
    /**
     * The data used to update QuizAttempts.
     */
    data: XOR<QuizAttemptUpdateManyMutationInput, QuizAttemptUncheckedUpdateManyInput>
    /**
     * Filter which QuizAttempts to update
     */
    where?: QuizAttemptWhereInput
    /**
     * Limit how many QuizAttempts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAttemptIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * QuizAttempt upsert
   */
  export type QuizAttemptUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAttempt
     */
    select?: QuizAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizAttempt
     */
    omit?: QuizAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAttemptInclude<ExtArgs> | null
    /**
     * The filter to search for the QuizAttempt to update in case it exists.
     */
    where: QuizAttemptWhereUniqueInput
    /**
     * In case the QuizAttempt found by the `where` argument doesn't exist, create a new QuizAttempt with this data.
     */
    create: XOR<QuizAttemptCreateInput, QuizAttemptUncheckedCreateInput>
    /**
     * In case the QuizAttempt was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuizAttemptUpdateInput, QuizAttemptUncheckedUpdateInput>
  }

  /**
   * QuizAttempt delete
   */
  export type QuizAttemptDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAttempt
     */
    select?: QuizAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizAttempt
     */
    omit?: QuizAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAttemptInclude<ExtArgs> | null
    /**
     * Filter which QuizAttempt to delete.
     */
    where: QuizAttemptWhereUniqueInput
  }

  /**
   * QuizAttempt deleteMany
   */
  export type QuizAttemptDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuizAttempts to delete
     */
    where?: QuizAttemptWhereInput
    /**
     * Limit how many QuizAttempts to delete.
     */
    limit?: number
  }

  /**
   * QuizAttempt without action
   */
  export type QuizAttemptDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAttempt
     */
    select?: QuizAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizAttempt
     */
    omit?: QuizAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAttemptInclude<ExtArgs> | null
  }


  /**
   * Model Progress
   */

  export type AggregateProgress = {
    _count: ProgressCountAggregateOutputType | null
    _avg: ProgressAvgAggregateOutputType | null
    _sum: ProgressSumAggregateOutputType | null
    _min: ProgressMinAggregateOutputType | null
    _max: ProgressMaxAggregateOutputType | null
  }

  export type ProgressAvgAggregateOutputType = {
    progressPercent: number | null
  }

  export type ProgressSumAggregateOutputType = {
    progressPercent: number | null
  }

  export type ProgressMinAggregateOutputType = {
    id: string | null
    studentId: string | null
    courseId: string | null
    progressPercent: number | null
    completed: boolean | null
  }

  export type ProgressMaxAggregateOutputType = {
    id: string | null
    studentId: string | null
    courseId: string | null
    progressPercent: number | null
    completed: boolean | null
  }

  export type ProgressCountAggregateOutputType = {
    id: number
    studentId: number
    courseId: number
    progressPercent: number
    completed: number
    _all: number
  }


  export type ProgressAvgAggregateInputType = {
    progressPercent?: true
  }

  export type ProgressSumAggregateInputType = {
    progressPercent?: true
  }

  export type ProgressMinAggregateInputType = {
    id?: true
    studentId?: true
    courseId?: true
    progressPercent?: true
    completed?: true
  }

  export type ProgressMaxAggregateInputType = {
    id?: true
    studentId?: true
    courseId?: true
    progressPercent?: true
    completed?: true
  }

  export type ProgressCountAggregateInputType = {
    id?: true
    studentId?: true
    courseId?: true
    progressPercent?: true
    completed?: true
    _all?: true
  }

  export type ProgressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Progress to aggregate.
     */
    where?: ProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Progresses to fetch.
     */
    orderBy?: ProgressOrderByWithRelationInput | ProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Progresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Progresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Progresses
    **/
    _count?: true | ProgressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProgressAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProgressSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProgressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProgressMaxAggregateInputType
  }

  export type GetProgressAggregateType<T extends ProgressAggregateArgs> = {
        [P in keyof T & keyof AggregateProgress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProgress[P]>
      : GetScalarType<T[P], AggregateProgress[P]>
  }




  export type ProgressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProgressWhereInput
    orderBy?: ProgressOrderByWithAggregationInput | ProgressOrderByWithAggregationInput[]
    by: ProgressScalarFieldEnum[] | ProgressScalarFieldEnum
    having?: ProgressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProgressCountAggregateInputType | true
    _avg?: ProgressAvgAggregateInputType
    _sum?: ProgressSumAggregateInputType
    _min?: ProgressMinAggregateInputType
    _max?: ProgressMaxAggregateInputType
  }

  export type ProgressGroupByOutputType = {
    id: string
    studentId: string
    courseId: string
    progressPercent: number
    completed: boolean
    _count: ProgressCountAggregateOutputType | null
    _avg: ProgressAvgAggregateOutputType | null
    _sum: ProgressSumAggregateOutputType | null
    _min: ProgressMinAggregateOutputType | null
    _max: ProgressMaxAggregateOutputType | null
  }

  type GetProgressGroupByPayload<T extends ProgressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProgressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProgressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProgressGroupByOutputType[P]>
            : GetScalarType<T[P], ProgressGroupByOutputType[P]>
        }
      >
    >


  export type ProgressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    courseId?: boolean
    progressPercent?: boolean
    completed?: boolean
    student?: boolean | UserDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["progress"]>

  export type ProgressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    courseId?: boolean
    progressPercent?: boolean
    completed?: boolean
    student?: boolean | UserDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["progress"]>

  export type ProgressSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    courseId?: boolean
    progressPercent?: boolean
    completed?: boolean
    student?: boolean | UserDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["progress"]>

  export type ProgressSelectScalar = {
    id?: boolean
    studentId?: boolean
    courseId?: boolean
    progressPercent?: boolean
    completed?: boolean
  }

  export type ProgressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentId" | "courseId" | "progressPercent" | "completed", ExtArgs["result"]["progress"]>
  export type ProgressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | UserDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }
  export type ProgressIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | UserDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }
  export type ProgressIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | UserDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }

  export type $ProgressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Progress"
    objects: {
      student: Prisma.$UserPayload<ExtArgs>
      course: Prisma.$CoursePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      studentId: string
      courseId: string
      progressPercent: number
      completed: boolean
    }, ExtArgs["result"]["progress"]>
    composites: {}
  }

  type ProgressGetPayload<S extends boolean | null | undefined | ProgressDefaultArgs> = $Result.GetResult<Prisma.$ProgressPayload, S>

  type ProgressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProgressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProgressCountAggregateInputType | true
    }

  export interface ProgressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Progress'], meta: { name: 'Progress' } }
    /**
     * Find zero or one Progress that matches the filter.
     * @param {ProgressFindUniqueArgs} args - Arguments to find a Progress
     * @example
     * // Get one Progress
     * const progress = await prisma.progress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProgressFindUniqueArgs>(args: SelectSubset<T, ProgressFindUniqueArgs<ExtArgs>>): Prisma__ProgressClient<$Result.GetResult<Prisma.$ProgressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Progress that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProgressFindUniqueOrThrowArgs} args - Arguments to find a Progress
     * @example
     * // Get one Progress
     * const progress = await prisma.progress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProgressFindUniqueOrThrowArgs>(args: SelectSubset<T, ProgressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProgressClient<$Result.GetResult<Prisma.$ProgressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Progress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgressFindFirstArgs} args - Arguments to find a Progress
     * @example
     * // Get one Progress
     * const progress = await prisma.progress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProgressFindFirstArgs>(args?: SelectSubset<T, ProgressFindFirstArgs<ExtArgs>>): Prisma__ProgressClient<$Result.GetResult<Prisma.$ProgressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Progress that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgressFindFirstOrThrowArgs} args - Arguments to find a Progress
     * @example
     * // Get one Progress
     * const progress = await prisma.progress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProgressFindFirstOrThrowArgs>(args?: SelectSubset<T, ProgressFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProgressClient<$Result.GetResult<Prisma.$ProgressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Progresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Progresses
     * const progresses = await prisma.progress.findMany()
     * 
     * // Get first 10 Progresses
     * const progresses = await prisma.progress.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const progressWithIdOnly = await prisma.progress.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProgressFindManyArgs>(args?: SelectSubset<T, ProgressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Progress.
     * @param {ProgressCreateArgs} args - Arguments to create a Progress.
     * @example
     * // Create one Progress
     * const Progress = await prisma.progress.create({
     *   data: {
     *     // ... data to create a Progress
     *   }
     * })
     * 
     */
    create<T extends ProgressCreateArgs>(args: SelectSubset<T, ProgressCreateArgs<ExtArgs>>): Prisma__ProgressClient<$Result.GetResult<Prisma.$ProgressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Progresses.
     * @param {ProgressCreateManyArgs} args - Arguments to create many Progresses.
     * @example
     * // Create many Progresses
     * const progress = await prisma.progress.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProgressCreateManyArgs>(args?: SelectSubset<T, ProgressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Progresses and returns the data saved in the database.
     * @param {ProgressCreateManyAndReturnArgs} args - Arguments to create many Progresses.
     * @example
     * // Create many Progresses
     * const progress = await prisma.progress.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Progresses and only return the `id`
     * const progressWithIdOnly = await prisma.progress.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProgressCreateManyAndReturnArgs>(args?: SelectSubset<T, ProgressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgressPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Progress.
     * @param {ProgressDeleteArgs} args - Arguments to delete one Progress.
     * @example
     * // Delete one Progress
     * const Progress = await prisma.progress.delete({
     *   where: {
     *     // ... filter to delete one Progress
     *   }
     * })
     * 
     */
    delete<T extends ProgressDeleteArgs>(args: SelectSubset<T, ProgressDeleteArgs<ExtArgs>>): Prisma__ProgressClient<$Result.GetResult<Prisma.$ProgressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Progress.
     * @param {ProgressUpdateArgs} args - Arguments to update one Progress.
     * @example
     * // Update one Progress
     * const progress = await prisma.progress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProgressUpdateArgs>(args: SelectSubset<T, ProgressUpdateArgs<ExtArgs>>): Prisma__ProgressClient<$Result.GetResult<Prisma.$ProgressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Progresses.
     * @param {ProgressDeleteManyArgs} args - Arguments to filter Progresses to delete.
     * @example
     * // Delete a few Progresses
     * const { count } = await prisma.progress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProgressDeleteManyArgs>(args?: SelectSubset<T, ProgressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Progresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Progresses
     * const progress = await prisma.progress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProgressUpdateManyArgs>(args: SelectSubset<T, ProgressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Progresses and returns the data updated in the database.
     * @param {ProgressUpdateManyAndReturnArgs} args - Arguments to update many Progresses.
     * @example
     * // Update many Progresses
     * const progress = await prisma.progress.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Progresses and only return the `id`
     * const progressWithIdOnly = await prisma.progress.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProgressUpdateManyAndReturnArgs>(args: SelectSubset<T, ProgressUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgressPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Progress.
     * @param {ProgressUpsertArgs} args - Arguments to update or create a Progress.
     * @example
     * // Update or create a Progress
     * const progress = await prisma.progress.upsert({
     *   create: {
     *     // ... data to create a Progress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Progress we want to update
     *   }
     * })
     */
    upsert<T extends ProgressUpsertArgs>(args: SelectSubset<T, ProgressUpsertArgs<ExtArgs>>): Prisma__ProgressClient<$Result.GetResult<Prisma.$ProgressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Progresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgressCountArgs} args - Arguments to filter Progresses to count.
     * @example
     * // Count the number of Progresses
     * const count = await prisma.progress.count({
     *   where: {
     *     // ... the filter for the Progresses we want to count
     *   }
     * })
    **/
    count<T extends ProgressCountArgs>(
      args?: Subset<T, ProgressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProgressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Progress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProgressAggregateArgs>(args: Subset<T, ProgressAggregateArgs>): Prisma.PrismaPromise<GetProgressAggregateType<T>>

    /**
     * Group by Progress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgressGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProgressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProgressGroupByArgs['orderBy'] }
        : { orderBy?: ProgressGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProgressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProgressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Progress model
   */
  readonly fields: ProgressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Progress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProgressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    course<T extends CourseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CourseDefaultArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Progress model
   */
  interface ProgressFieldRefs {
    readonly id: FieldRef<"Progress", 'String'>
    readonly studentId: FieldRef<"Progress", 'String'>
    readonly courseId: FieldRef<"Progress", 'String'>
    readonly progressPercent: FieldRef<"Progress", 'Float'>
    readonly completed: FieldRef<"Progress", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Progress findUnique
   */
  export type ProgressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Progress
     */
    omit?: ProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressInclude<ExtArgs> | null
    /**
     * Filter, which Progress to fetch.
     */
    where: ProgressWhereUniqueInput
  }

  /**
   * Progress findUniqueOrThrow
   */
  export type ProgressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Progress
     */
    omit?: ProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressInclude<ExtArgs> | null
    /**
     * Filter, which Progress to fetch.
     */
    where: ProgressWhereUniqueInput
  }

  /**
   * Progress findFirst
   */
  export type ProgressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Progress
     */
    omit?: ProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressInclude<ExtArgs> | null
    /**
     * Filter, which Progress to fetch.
     */
    where?: ProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Progresses to fetch.
     */
    orderBy?: ProgressOrderByWithRelationInput | ProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Progresses.
     */
    cursor?: ProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Progresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Progresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Progresses.
     */
    distinct?: ProgressScalarFieldEnum | ProgressScalarFieldEnum[]
  }

  /**
   * Progress findFirstOrThrow
   */
  export type ProgressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Progress
     */
    omit?: ProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressInclude<ExtArgs> | null
    /**
     * Filter, which Progress to fetch.
     */
    where?: ProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Progresses to fetch.
     */
    orderBy?: ProgressOrderByWithRelationInput | ProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Progresses.
     */
    cursor?: ProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Progresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Progresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Progresses.
     */
    distinct?: ProgressScalarFieldEnum | ProgressScalarFieldEnum[]
  }

  /**
   * Progress findMany
   */
  export type ProgressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Progress
     */
    omit?: ProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressInclude<ExtArgs> | null
    /**
     * Filter, which Progresses to fetch.
     */
    where?: ProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Progresses to fetch.
     */
    orderBy?: ProgressOrderByWithRelationInput | ProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Progresses.
     */
    cursor?: ProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Progresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Progresses.
     */
    skip?: number
    distinct?: ProgressScalarFieldEnum | ProgressScalarFieldEnum[]
  }

  /**
   * Progress create
   */
  export type ProgressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Progress
     */
    omit?: ProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressInclude<ExtArgs> | null
    /**
     * The data needed to create a Progress.
     */
    data: XOR<ProgressCreateInput, ProgressUncheckedCreateInput>
  }

  /**
   * Progress createMany
   */
  export type ProgressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Progresses.
     */
    data: ProgressCreateManyInput | ProgressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Progress createManyAndReturn
   */
  export type ProgressCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Progress
     */
    omit?: ProgressOmit<ExtArgs> | null
    /**
     * The data used to create many Progresses.
     */
    data: ProgressCreateManyInput | ProgressCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Progress update
   */
  export type ProgressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Progress
     */
    omit?: ProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressInclude<ExtArgs> | null
    /**
     * The data needed to update a Progress.
     */
    data: XOR<ProgressUpdateInput, ProgressUncheckedUpdateInput>
    /**
     * Choose, which Progress to update.
     */
    where: ProgressWhereUniqueInput
  }

  /**
   * Progress updateMany
   */
  export type ProgressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Progresses.
     */
    data: XOR<ProgressUpdateManyMutationInput, ProgressUncheckedUpdateManyInput>
    /**
     * Filter which Progresses to update
     */
    where?: ProgressWhereInput
    /**
     * Limit how many Progresses to update.
     */
    limit?: number
  }

  /**
   * Progress updateManyAndReturn
   */
  export type ProgressUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Progress
     */
    omit?: ProgressOmit<ExtArgs> | null
    /**
     * The data used to update Progresses.
     */
    data: XOR<ProgressUpdateManyMutationInput, ProgressUncheckedUpdateManyInput>
    /**
     * Filter which Progresses to update
     */
    where?: ProgressWhereInput
    /**
     * Limit how many Progresses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Progress upsert
   */
  export type ProgressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Progress
     */
    omit?: ProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressInclude<ExtArgs> | null
    /**
     * The filter to search for the Progress to update in case it exists.
     */
    where: ProgressWhereUniqueInput
    /**
     * In case the Progress found by the `where` argument doesn't exist, create a new Progress with this data.
     */
    create: XOR<ProgressCreateInput, ProgressUncheckedCreateInput>
    /**
     * In case the Progress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProgressUpdateInput, ProgressUncheckedUpdateInput>
  }

  /**
   * Progress delete
   */
  export type ProgressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Progress
     */
    omit?: ProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressInclude<ExtArgs> | null
    /**
     * Filter which Progress to delete.
     */
    where: ProgressWhereUniqueInput
  }

  /**
   * Progress deleteMany
   */
  export type ProgressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Progresses to delete
     */
    where?: ProgressWhereInput
    /**
     * Limit how many Progresses to delete.
     */
    limit?: number
  }

  /**
   * Progress without action
   */
  export type ProgressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Progress
     */
    omit?: ProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressInclude<ExtArgs> | null
  }


  /**
   * Model Feedback
   */

  export type AggregateFeedback = {
    _count: FeedbackCountAggregateOutputType | null
    _avg: FeedbackAvgAggregateOutputType | null
    _sum: FeedbackSumAggregateOutputType | null
    _min: FeedbackMinAggregateOutputType | null
    _max: FeedbackMaxAggregateOutputType | null
  }

  export type FeedbackAvgAggregateOutputType = {
    rating: number | null
  }

  export type FeedbackSumAggregateOutputType = {
    rating: number | null
  }

  export type FeedbackMinAggregateOutputType = {
    id: string | null
    userId: string | null
    courseId: string | null
    rating: number | null
    comment: string | null
    createdAt: Date | null
  }

  export type FeedbackMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    courseId: string | null
    rating: number | null
    comment: string | null
    createdAt: Date | null
  }

  export type FeedbackCountAggregateOutputType = {
    id: number
    userId: number
    courseId: number
    rating: number
    comment: number
    createdAt: number
    _all: number
  }


  export type FeedbackAvgAggregateInputType = {
    rating?: true
  }

  export type FeedbackSumAggregateInputType = {
    rating?: true
  }

  export type FeedbackMinAggregateInputType = {
    id?: true
    userId?: true
    courseId?: true
    rating?: true
    comment?: true
    createdAt?: true
  }

  export type FeedbackMaxAggregateInputType = {
    id?: true
    userId?: true
    courseId?: true
    rating?: true
    comment?: true
    createdAt?: true
  }

  export type FeedbackCountAggregateInputType = {
    id?: true
    userId?: true
    courseId?: true
    rating?: true
    comment?: true
    createdAt?: true
    _all?: true
  }

  export type FeedbackAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Feedback to aggregate.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Feedbacks
    **/
    _count?: true | FeedbackCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FeedbackAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FeedbackSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FeedbackMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FeedbackMaxAggregateInputType
  }

  export type GetFeedbackAggregateType<T extends FeedbackAggregateArgs> = {
        [P in keyof T & keyof AggregateFeedback]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFeedback[P]>
      : GetScalarType<T[P], AggregateFeedback[P]>
  }




  export type FeedbackGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedbackWhereInput
    orderBy?: FeedbackOrderByWithAggregationInput | FeedbackOrderByWithAggregationInput[]
    by: FeedbackScalarFieldEnum[] | FeedbackScalarFieldEnum
    having?: FeedbackScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FeedbackCountAggregateInputType | true
    _avg?: FeedbackAvgAggregateInputType
    _sum?: FeedbackSumAggregateInputType
    _min?: FeedbackMinAggregateInputType
    _max?: FeedbackMaxAggregateInputType
  }

  export type FeedbackGroupByOutputType = {
    id: string
    userId: string
    courseId: string
    rating: number
    comment: string
    createdAt: Date
    _count: FeedbackCountAggregateOutputType | null
    _avg: FeedbackAvgAggregateOutputType | null
    _sum: FeedbackSumAggregateOutputType | null
    _min: FeedbackMinAggregateOutputType | null
    _max: FeedbackMaxAggregateOutputType | null
  }

  type GetFeedbackGroupByPayload<T extends FeedbackGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FeedbackGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FeedbackGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FeedbackGroupByOutputType[P]>
            : GetScalarType<T[P], FeedbackGroupByOutputType[P]>
        }
      >
    >


  export type FeedbackSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    courseId?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["feedback"]>

  export type FeedbackSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    courseId?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["feedback"]>

  export type FeedbackSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    courseId?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["feedback"]>

  export type FeedbackSelectScalar = {
    id?: boolean
    userId?: boolean
    courseId?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
  }

  export type FeedbackOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "courseId" | "rating" | "comment" | "createdAt", ExtArgs["result"]["feedback"]>
  export type FeedbackInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }
  export type FeedbackIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }
  export type FeedbackIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }

  export type $FeedbackPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Feedback"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      course: Prisma.$CoursePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      courseId: string
      rating: number
      comment: string
      createdAt: Date
    }, ExtArgs["result"]["feedback"]>
    composites: {}
  }

  type FeedbackGetPayload<S extends boolean | null | undefined | FeedbackDefaultArgs> = $Result.GetResult<Prisma.$FeedbackPayload, S>

  type FeedbackCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FeedbackFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FeedbackCountAggregateInputType | true
    }

  export interface FeedbackDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Feedback'], meta: { name: 'Feedback' } }
    /**
     * Find zero or one Feedback that matches the filter.
     * @param {FeedbackFindUniqueArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FeedbackFindUniqueArgs>(args: SelectSubset<T, FeedbackFindUniqueArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Feedback that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FeedbackFindUniqueOrThrowArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FeedbackFindUniqueOrThrowArgs>(args: SelectSubset<T, FeedbackFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Feedback that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackFindFirstArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FeedbackFindFirstArgs>(args?: SelectSubset<T, FeedbackFindFirstArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Feedback that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackFindFirstOrThrowArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FeedbackFindFirstOrThrowArgs>(args?: SelectSubset<T, FeedbackFindFirstOrThrowArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Feedbacks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Feedbacks
     * const feedbacks = await prisma.feedback.findMany()
     * 
     * // Get first 10 Feedbacks
     * const feedbacks = await prisma.feedback.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const feedbackWithIdOnly = await prisma.feedback.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FeedbackFindManyArgs>(args?: SelectSubset<T, FeedbackFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Feedback.
     * @param {FeedbackCreateArgs} args - Arguments to create a Feedback.
     * @example
     * // Create one Feedback
     * const Feedback = await prisma.feedback.create({
     *   data: {
     *     // ... data to create a Feedback
     *   }
     * })
     * 
     */
    create<T extends FeedbackCreateArgs>(args: SelectSubset<T, FeedbackCreateArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Feedbacks.
     * @param {FeedbackCreateManyArgs} args - Arguments to create many Feedbacks.
     * @example
     * // Create many Feedbacks
     * const feedback = await prisma.feedback.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FeedbackCreateManyArgs>(args?: SelectSubset<T, FeedbackCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Feedbacks and returns the data saved in the database.
     * @param {FeedbackCreateManyAndReturnArgs} args - Arguments to create many Feedbacks.
     * @example
     * // Create many Feedbacks
     * const feedback = await prisma.feedback.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Feedbacks and only return the `id`
     * const feedbackWithIdOnly = await prisma.feedback.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FeedbackCreateManyAndReturnArgs>(args?: SelectSubset<T, FeedbackCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Feedback.
     * @param {FeedbackDeleteArgs} args - Arguments to delete one Feedback.
     * @example
     * // Delete one Feedback
     * const Feedback = await prisma.feedback.delete({
     *   where: {
     *     // ... filter to delete one Feedback
     *   }
     * })
     * 
     */
    delete<T extends FeedbackDeleteArgs>(args: SelectSubset<T, FeedbackDeleteArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Feedback.
     * @param {FeedbackUpdateArgs} args - Arguments to update one Feedback.
     * @example
     * // Update one Feedback
     * const feedback = await prisma.feedback.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FeedbackUpdateArgs>(args: SelectSubset<T, FeedbackUpdateArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Feedbacks.
     * @param {FeedbackDeleteManyArgs} args - Arguments to filter Feedbacks to delete.
     * @example
     * // Delete a few Feedbacks
     * const { count } = await prisma.feedback.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FeedbackDeleteManyArgs>(args?: SelectSubset<T, FeedbackDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Feedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Feedbacks
     * const feedback = await prisma.feedback.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FeedbackUpdateManyArgs>(args: SelectSubset<T, FeedbackUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Feedbacks and returns the data updated in the database.
     * @param {FeedbackUpdateManyAndReturnArgs} args - Arguments to update many Feedbacks.
     * @example
     * // Update many Feedbacks
     * const feedback = await prisma.feedback.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Feedbacks and only return the `id`
     * const feedbackWithIdOnly = await prisma.feedback.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FeedbackUpdateManyAndReturnArgs>(args: SelectSubset<T, FeedbackUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Feedback.
     * @param {FeedbackUpsertArgs} args - Arguments to update or create a Feedback.
     * @example
     * // Update or create a Feedback
     * const feedback = await prisma.feedback.upsert({
     *   create: {
     *     // ... data to create a Feedback
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Feedback we want to update
     *   }
     * })
     */
    upsert<T extends FeedbackUpsertArgs>(args: SelectSubset<T, FeedbackUpsertArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Feedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackCountArgs} args - Arguments to filter Feedbacks to count.
     * @example
     * // Count the number of Feedbacks
     * const count = await prisma.feedback.count({
     *   where: {
     *     // ... the filter for the Feedbacks we want to count
     *   }
     * })
    **/
    count<T extends FeedbackCountArgs>(
      args?: Subset<T, FeedbackCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FeedbackCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Feedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FeedbackAggregateArgs>(args: Subset<T, FeedbackAggregateArgs>): Prisma.PrismaPromise<GetFeedbackAggregateType<T>>

    /**
     * Group by Feedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FeedbackGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FeedbackGroupByArgs['orderBy'] }
        : { orderBy?: FeedbackGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FeedbackGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFeedbackGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Feedback model
   */
  readonly fields: FeedbackFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Feedback.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FeedbackClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    course<T extends CourseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CourseDefaultArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Feedback model
   */
  interface FeedbackFieldRefs {
    readonly id: FieldRef<"Feedback", 'String'>
    readonly userId: FieldRef<"Feedback", 'String'>
    readonly courseId: FieldRef<"Feedback", 'String'>
    readonly rating: FieldRef<"Feedback", 'Int'>
    readonly comment: FieldRef<"Feedback", 'String'>
    readonly createdAt: FieldRef<"Feedback", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Feedback findUnique
   */
  export type FeedbackFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback findUniqueOrThrow
   */
  export type FeedbackFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback findFirst
   */
  export type FeedbackFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Feedbacks.
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Feedbacks.
     */
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * Feedback findFirstOrThrow
   */
  export type FeedbackFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Feedbacks.
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Feedbacks.
     */
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * Feedback findMany
   */
  export type FeedbackFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter, which Feedbacks to fetch.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Feedbacks.
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * Feedback create
   */
  export type FeedbackCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * The data needed to create a Feedback.
     */
    data: XOR<FeedbackCreateInput, FeedbackUncheckedCreateInput>
  }

  /**
   * Feedback createMany
   */
  export type FeedbackCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Feedbacks.
     */
    data: FeedbackCreateManyInput | FeedbackCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Feedback createManyAndReturn
   */
  export type FeedbackCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * The data used to create many Feedbacks.
     */
    data: FeedbackCreateManyInput | FeedbackCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Feedback update
   */
  export type FeedbackUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * The data needed to update a Feedback.
     */
    data: XOR<FeedbackUpdateInput, FeedbackUncheckedUpdateInput>
    /**
     * Choose, which Feedback to update.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback updateMany
   */
  export type FeedbackUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Feedbacks.
     */
    data: XOR<FeedbackUpdateManyMutationInput, FeedbackUncheckedUpdateManyInput>
    /**
     * Filter which Feedbacks to update
     */
    where?: FeedbackWhereInput
    /**
     * Limit how many Feedbacks to update.
     */
    limit?: number
  }

  /**
   * Feedback updateManyAndReturn
   */
  export type FeedbackUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * The data used to update Feedbacks.
     */
    data: XOR<FeedbackUpdateManyMutationInput, FeedbackUncheckedUpdateManyInput>
    /**
     * Filter which Feedbacks to update
     */
    where?: FeedbackWhereInput
    /**
     * Limit how many Feedbacks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Feedback upsert
   */
  export type FeedbackUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * The filter to search for the Feedback to update in case it exists.
     */
    where: FeedbackWhereUniqueInput
    /**
     * In case the Feedback found by the `where` argument doesn't exist, create a new Feedback with this data.
     */
    create: XOR<FeedbackCreateInput, FeedbackUncheckedCreateInput>
    /**
     * In case the Feedback was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FeedbackUpdateInput, FeedbackUncheckedUpdateInput>
  }

  /**
   * Feedback delete
   */
  export type FeedbackDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter which Feedback to delete.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback deleteMany
   */
  export type FeedbackDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Feedbacks to delete
     */
    where?: FeedbackWhereInput
    /**
     * Limit how many Feedbacks to delete.
     */
    limit?: number
  }

  /**
   * Feedback without action
   */
  export type FeedbackDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    role: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    password: string
    role: $Enums.Role
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    courses?: boolean | User$coursesArgs<ExtArgs>
    feedbacks?: boolean | User$feedbacksArgs<ExtArgs>
    enrollments?: boolean | User$enrollmentsArgs<ExtArgs>
    quizAttempts?: boolean | User$quizAttemptsArgs<ExtArgs>
    progresses?: boolean | User$progressesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "role" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    courses?: boolean | User$coursesArgs<ExtArgs>
    feedbacks?: boolean | User$feedbacksArgs<ExtArgs>
    enrollments?: boolean | User$enrollmentsArgs<ExtArgs>
    quizAttempts?: boolean | User$quizAttemptsArgs<ExtArgs>
    progresses?: boolean | User$progressesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      courses: Prisma.$CoursePayload<ExtArgs>[]
      feedbacks: Prisma.$FeedbackPayload<ExtArgs>[]
      enrollments: Prisma.$EnrollmentPayload<ExtArgs>[]
      quizAttempts: Prisma.$QuizAttemptPayload<ExtArgs>[]
      progresses: Prisma.$ProgressPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      password: string
      role: $Enums.Role
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    courses<T extends User$coursesArgs<ExtArgs> = {}>(args?: Subset<T, User$coursesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    feedbacks<T extends User$feedbacksArgs<ExtArgs> = {}>(args?: Subset<T, User$feedbacksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    enrollments<T extends User$enrollmentsArgs<ExtArgs> = {}>(args?: Subset<T, User$enrollmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    quizAttempts<T extends User$quizAttemptsArgs<ExtArgs> = {}>(args?: Subset<T, User$quizAttemptsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizAttemptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    progresses<T extends User$progressesArgs<ExtArgs> = {}>(args?: Subset<T, User$progressesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.courses
   */
  export type User$coursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    where?: CourseWhereInput
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    cursor?: CourseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * User.feedbacks
   */
  export type User$feedbacksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    where?: FeedbackWhereInput
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    cursor?: FeedbackWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * User.enrollments
   */
  export type User$enrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    where?: EnrollmentWhereInput
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    cursor?: EnrollmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * User.quizAttempts
   */
  export type User$quizAttemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAttempt
     */
    select?: QuizAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizAttempt
     */
    omit?: QuizAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAttemptInclude<ExtArgs> | null
    where?: QuizAttemptWhereInput
    orderBy?: QuizAttemptOrderByWithRelationInput | QuizAttemptOrderByWithRelationInput[]
    cursor?: QuizAttemptWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuizAttemptScalarFieldEnum | QuizAttemptScalarFieldEnum[]
  }

  /**
   * User.progresses
   */
  export type User$progressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Progress
     */
    omit?: ProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressInclude<ExtArgs> | null
    where?: ProgressWhereInput
    orderBy?: ProgressOrderByWithRelationInput | ProgressOrderByWithRelationInput[]
    cursor?: ProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProgressScalarFieldEnum | ProgressScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CourseScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    thumbnail: 'thumbnail',
    price: 'price',
    teacherId: 'teacherId',
    createdAt: 'createdAt'
  };

  export type CourseScalarFieldEnum = (typeof CourseScalarFieldEnum)[keyof typeof CourseScalarFieldEnum]


  export const CourseContentScalarFieldEnum: {
    id: 'id',
    title: 'title',
    type: 'type',
    url: 'url',
    courseId: 'courseId',
    orderIndex: 'orderIndex'
  };

  export type CourseContentScalarFieldEnum = (typeof CourseContentScalarFieldEnum)[keyof typeof CourseContentScalarFieldEnum]


  export const EnrollmentScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    courseId: 'courseId',
    enrolledAt: 'enrolledAt'
  };

  export type EnrollmentScalarFieldEnum = (typeof EnrollmentScalarFieldEnum)[keyof typeof EnrollmentScalarFieldEnum]


  export const QuizScalarFieldEnum: {
    id: 'id',
    title: 'title',
    type: 'type',
    courseId: 'courseId'
  };

  export type QuizScalarFieldEnum = (typeof QuizScalarFieldEnum)[keyof typeof QuizScalarFieldEnum]


  export const QuizQuestionScalarFieldEnum: {
    id: 'id',
    quizId: 'quizId',
    questionText: 'questionText',
    options: 'options',
    correctAnswer: 'correctAnswer'
  };

  export type QuizQuestionScalarFieldEnum = (typeof QuizQuestionScalarFieldEnum)[keyof typeof QuizQuestionScalarFieldEnum]


  export const QuizAttemptScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    quizId: 'quizId',
    score: 'score',
    answers: 'answers',
    submittedAt: 'submittedAt'
  };

  export type QuizAttemptScalarFieldEnum = (typeof QuizAttemptScalarFieldEnum)[keyof typeof QuizAttemptScalarFieldEnum]


  export const ProgressScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    courseId: 'courseId',
    progressPercent: 'progressPercent',
    completed: 'completed'
  };

  export type ProgressScalarFieldEnum = (typeof ProgressScalarFieldEnum)[keyof typeof ProgressScalarFieldEnum]


  export const FeedbackScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    courseId: 'courseId',
    rating: 'rating',
    comment: 'comment',
    createdAt: 'createdAt'
  };

  export type FeedbackScalarFieldEnum = (typeof FeedbackScalarFieldEnum)[keyof typeof FeedbackScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    role: 'role',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'ContentType'
   */
  export type EnumContentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ContentType'>
    


  /**
   * Reference to a field of type 'ContentType[]'
   */
  export type ListEnumContentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ContentType[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'QuizType'
   */
  export type EnumQuizTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QuizType'>
    


  /**
   * Reference to a field of type 'QuizType[]'
   */
  export type ListEnumQuizTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QuizType[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    
  /**
   * Deep Input Types
   */


  export type CourseWhereInput = {
    AND?: CourseWhereInput | CourseWhereInput[]
    OR?: CourseWhereInput[]
    NOT?: CourseWhereInput | CourseWhereInput[]
    id?: StringFilter<"Course"> | string
    title?: StringFilter<"Course"> | string
    description?: StringFilter<"Course"> | string
    thumbnail?: StringFilter<"Course"> | string
    price?: FloatFilter<"Course"> | number
    teacherId?: StringFilter<"Course"> | string
    createdAt?: DateTimeFilter<"Course"> | Date | string
    teacher?: XOR<UserScalarRelationFilter, UserWhereInput>
    contents?: CourseContentListRelationFilter
    enrollments?: EnrollmentListRelationFilter
    feedbacks?: FeedbackListRelationFilter
    quizzes?: QuizListRelationFilter
    progresses?: ProgressListRelationFilter
  }

  export type CourseOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    thumbnail?: SortOrder
    price?: SortOrder
    teacherId?: SortOrder
    createdAt?: SortOrder
    teacher?: UserOrderByWithRelationInput
    contents?: CourseContentOrderByRelationAggregateInput
    enrollments?: EnrollmentOrderByRelationAggregateInput
    feedbacks?: FeedbackOrderByRelationAggregateInput
    quizzes?: QuizOrderByRelationAggregateInput
    progresses?: ProgressOrderByRelationAggregateInput
  }

  export type CourseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CourseWhereInput | CourseWhereInput[]
    OR?: CourseWhereInput[]
    NOT?: CourseWhereInput | CourseWhereInput[]
    title?: StringFilter<"Course"> | string
    description?: StringFilter<"Course"> | string
    thumbnail?: StringFilter<"Course"> | string
    price?: FloatFilter<"Course"> | number
    teacherId?: StringFilter<"Course"> | string
    createdAt?: DateTimeFilter<"Course"> | Date | string
    teacher?: XOR<UserScalarRelationFilter, UserWhereInput>
    contents?: CourseContentListRelationFilter
    enrollments?: EnrollmentListRelationFilter
    feedbacks?: FeedbackListRelationFilter
    quizzes?: QuizListRelationFilter
    progresses?: ProgressListRelationFilter
  }, "id">

  export type CourseOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    thumbnail?: SortOrder
    price?: SortOrder
    teacherId?: SortOrder
    createdAt?: SortOrder
    _count?: CourseCountOrderByAggregateInput
    _avg?: CourseAvgOrderByAggregateInput
    _max?: CourseMaxOrderByAggregateInput
    _min?: CourseMinOrderByAggregateInput
    _sum?: CourseSumOrderByAggregateInput
  }

  export type CourseScalarWhereWithAggregatesInput = {
    AND?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[]
    OR?: CourseScalarWhereWithAggregatesInput[]
    NOT?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Course"> | string
    title?: StringWithAggregatesFilter<"Course"> | string
    description?: StringWithAggregatesFilter<"Course"> | string
    thumbnail?: StringWithAggregatesFilter<"Course"> | string
    price?: FloatWithAggregatesFilter<"Course"> | number
    teacherId?: StringWithAggregatesFilter<"Course"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Course"> | Date | string
  }

  export type CourseContentWhereInput = {
    AND?: CourseContentWhereInput | CourseContentWhereInput[]
    OR?: CourseContentWhereInput[]
    NOT?: CourseContentWhereInput | CourseContentWhereInput[]
    id?: StringFilter<"CourseContent"> | string
    title?: StringFilter<"CourseContent"> | string
    type?: EnumContentTypeFilter<"CourseContent"> | $Enums.ContentType
    url?: StringFilter<"CourseContent"> | string
    courseId?: StringFilter<"CourseContent"> | string
    orderIndex?: IntFilter<"CourseContent"> | number
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
  }

  export type CourseContentOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    type?: SortOrder
    url?: SortOrder
    courseId?: SortOrder
    orderIndex?: SortOrder
    course?: CourseOrderByWithRelationInput
  }

  export type CourseContentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CourseContentWhereInput | CourseContentWhereInput[]
    OR?: CourseContentWhereInput[]
    NOT?: CourseContentWhereInput | CourseContentWhereInput[]
    title?: StringFilter<"CourseContent"> | string
    type?: EnumContentTypeFilter<"CourseContent"> | $Enums.ContentType
    url?: StringFilter<"CourseContent"> | string
    courseId?: StringFilter<"CourseContent"> | string
    orderIndex?: IntFilter<"CourseContent"> | number
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
  }, "id">

  export type CourseContentOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    type?: SortOrder
    url?: SortOrder
    courseId?: SortOrder
    orderIndex?: SortOrder
    _count?: CourseContentCountOrderByAggregateInput
    _avg?: CourseContentAvgOrderByAggregateInput
    _max?: CourseContentMaxOrderByAggregateInput
    _min?: CourseContentMinOrderByAggregateInput
    _sum?: CourseContentSumOrderByAggregateInput
  }

  export type CourseContentScalarWhereWithAggregatesInput = {
    AND?: CourseContentScalarWhereWithAggregatesInput | CourseContentScalarWhereWithAggregatesInput[]
    OR?: CourseContentScalarWhereWithAggregatesInput[]
    NOT?: CourseContentScalarWhereWithAggregatesInput | CourseContentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CourseContent"> | string
    title?: StringWithAggregatesFilter<"CourseContent"> | string
    type?: EnumContentTypeWithAggregatesFilter<"CourseContent"> | $Enums.ContentType
    url?: StringWithAggregatesFilter<"CourseContent"> | string
    courseId?: StringWithAggregatesFilter<"CourseContent"> | string
    orderIndex?: IntWithAggregatesFilter<"CourseContent"> | number
  }

  export type EnrollmentWhereInput = {
    AND?: EnrollmentWhereInput | EnrollmentWhereInput[]
    OR?: EnrollmentWhereInput[]
    NOT?: EnrollmentWhereInput | EnrollmentWhereInput[]
    id?: StringFilter<"Enrollment"> | string
    studentId?: StringFilter<"Enrollment"> | string
    courseId?: StringFilter<"Enrollment"> | string
    enrolledAt?: DateTimeFilter<"Enrollment"> | Date | string
    student?: XOR<UserScalarRelationFilter, UserWhereInput>
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
  }

  export type EnrollmentOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrder
    enrolledAt?: SortOrder
    student?: UserOrderByWithRelationInput
    course?: CourseOrderByWithRelationInput
  }

  export type EnrollmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EnrollmentWhereInput | EnrollmentWhereInput[]
    OR?: EnrollmentWhereInput[]
    NOT?: EnrollmentWhereInput | EnrollmentWhereInput[]
    studentId?: StringFilter<"Enrollment"> | string
    courseId?: StringFilter<"Enrollment"> | string
    enrolledAt?: DateTimeFilter<"Enrollment"> | Date | string
    student?: XOR<UserScalarRelationFilter, UserWhereInput>
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
  }, "id">

  export type EnrollmentOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrder
    enrolledAt?: SortOrder
    _count?: EnrollmentCountOrderByAggregateInput
    _max?: EnrollmentMaxOrderByAggregateInput
    _min?: EnrollmentMinOrderByAggregateInput
  }

  export type EnrollmentScalarWhereWithAggregatesInput = {
    AND?: EnrollmentScalarWhereWithAggregatesInput | EnrollmentScalarWhereWithAggregatesInput[]
    OR?: EnrollmentScalarWhereWithAggregatesInput[]
    NOT?: EnrollmentScalarWhereWithAggregatesInput | EnrollmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Enrollment"> | string
    studentId?: StringWithAggregatesFilter<"Enrollment"> | string
    courseId?: StringWithAggregatesFilter<"Enrollment"> | string
    enrolledAt?: DateTimeWithAggregatesFilter<"Enrollment"> | Date | string
  }

  export type QuizWhereInput = {
    AND?: QuizWhereInput | QuizWhereInput[]
    OR?: QuizWhereInput[]
    NOT?: QuizWhereInput | QuizWhereInput[]
    id?: StringFilter<"Quiz"> | string
    title?: StringFilter<"Quiz"> | string
    type?: EnumQuizTypeFilter<"Quiz"> | $Enums.QuizType
    courseId?: StringFilter<"Quiz"> | string
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
    questions?: QuizQuestionListRelationFilter
    attempts?: QuizAttemptListRelationFilter
  }

  export type QuizOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    type?: SortOrder
    courseId?: SortOrder
    course?: CourseOrderByWithRelationInput
    questions?: QuizQuestionOrderByRelationAggregateInput
    attempts?: QuizAttemptOrderByRelationAggregateInput
  }

  export type QuizWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: QuizWhereInput | QuizWhereInput[]
    OR?: QuizWhereInput[]
    NOT?: QuizWhereInput | QuizWhereInput[]
    title?: StringFilter<"Quiz"> | string
    type?: EnumQuizTypeFilter<"Quiz"> | $Enums.QuizType
    courseId?: StringFilter<"Quiz"> | string
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
    questions?: QuizQuestionListRelationFilter
    attempts?: QuizAttemptListRelationFilter
  }, "id">

  export type QuizOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    type?: SortOrder
    courseId?: SortOrder
    _count?: QuizCountOrderByAggregateInput
    _max?: QuizMaxOrderByAggregateInput
    _min?: QuizMinOrderByAggregateInput
  }

  export type QuizScalarWhereWithAggregatesInput = {
    AND?: QuizScalarWhereWithAggregatesInput | QuizScalarWhereWithAggregatesInput[]
    OR?: QuizScalarWhereWithAggregatesInput[]
    NOT?: QuizScalarWhereWithAggregatesInput | QuizScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Quiz"> | string
    title?: StringWithAggregatesFilter<"Quiz"> | string
    type?: EnumQuizTypeWithAggregatesFilter<"Quiz"> | $Enums.QuizType
    courseId?: StringWithAggregatesFilter<"Quiz"> | string
  }

  export type QuizQuestionWhereInput = {
    AND?: QuizQuestionWhereInput | QuizQuestionWhereInput[]
    OR?: QuizQuestionWhereInput[]
    NOT?: QuizQuestionWhereInput | QuizQuestionWhereInput[]
    id?: StringFilter<"QuizQuestion"> | string
    quizId?: StringFilter<"QuizQuestion"> | string
    questionText?: StringFilter<"QuizQuestion"> | string
    options?: StringNullableListFilter<"QuizQuestion">
    correctAnswer?: StringFilter<"QuizQuestion"> | string
    quiz?: XOR<QuizScalarRelationFilter, QuizWhereInput>
  }

  export type QuizQuestionOrderByWithRelationInput = {
    id?: SortOrder
    quizId?: SortOrder
    questionText?: SortOrder
    options?: SortOrder
    correctAnswer?: SortOrder
    quiz?: QuizOrderByWithRelationInput
  }

  export type QuizQuestionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: QuizQuestionWhereInput | QuizQuestionWhereInput[]
    OR?: QuizQuestionWhereInput[]
    NOT?: QuizQuestionWhereInput | QuizQuestionWhereInput[]
    quizId?: StringFilter<"QuizQuestion"> | string
    questionText?: StringFilter<"QuizQuestion"> | string
    options?: StringNullableListFilter<"QuizQuestion">
    correctAnswer?: StringFilter<"QuizQuestion"> | string
    quiz?: XOR<QuizScalarRelationFilter, QuizWhereInput>
  }, "id">

  export type QuizQuestionOrderByWithAggregationInput = {
    id?: SortOrder
    quizId?: SortOrder
    questionText?: SortOrder
    options?: SortOrder
    correctAnswer?: SortOrder
    _count?: QuizQuestionCountOrderByAggregateInput
    _max?: QuizQuestionMaxOrderByAggregateInput
    _min?: QuizQuestionMinOrderByAggregateInput
  }

  export type QuizQuestionScalarWhereWithAggregatesInput = {
    AND?: QuizQuestionScalarWhereWithAggregatesInput | QuizQuestionScalarWhereWithAggregatesInput[]
    OR?: QuizQuestionScalarWhereWithAggregatesInput[]
    NOT?: QuizQuestionScalarWhereWithAggregatesInput | QuizQuestionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"QuizQuestion"> | string
    quizId?: StringWithAggregatesFilter<"QuizQuestion"> | string
    questionText?: StringWithAggregatesFilter<"QuizQuestion"> | string
    options?: StringNullableListFilter<"QuizQuestion">
    correctAnswer?: StringWithAggregatesFilter<"QuizQuestion"> | string
  }

  export type QuizAttemptWhereInput = {
    AND?: QuizAttemptWhereInput | QuizAttemptWhereInput[]
    OR?: QuizAttemptWhereInput[]
    NOT?: QuizAttemptWhereInput | QuizAttemptWhereInput[]
    id?: StringFilter<"QuizAttempt"> | string
    studentId?: StringFilter<"QuizAttempt"> | string
    quizId?: StringFilter<"QuizAttempt"> | string
    score?: FloatFilter<"QuizAttempt"> | number
    answers?: StringNullableListFilter<"QuizAttempt">
    submittedAt?: DateTimeFilter<"QuizAttempt"> | Date | string
    student?: XOR<UserScalarRelationFilter, UserWhereInput>
    quiz?: XOR<QuizScalarRelationFilter, QuizWhereInput>
  }

  export type QuizAttemptOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    quizId?: SortOrder
    score?: SortOrder
    answers?: SortOrder
    submittedAt?: SortOrder
    student?: UserOrderByWithRelationInput
    quiz?: QuizOrderByWithRelationInput
  }

  export type QuizAttemptWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: QuizAttemptWhereInput | QuizAttemptWhereInput[]
    OR?: QuizAttemptWhereInput[]
    NOT?: QuizAttemptWhereInput | QuizAttemptWhereInput[]
    studentId?: StringFilter<"QuizAttempt"> | string
    quizId?: StringFilter<"QuizAttempt"> | string
    score?: FloatFilter<"QuizAttempt"> | number
    answers?: StringNullableListFilter<"QuizAttempt">
    submittedAt?: DateTimeFilter<"QuizAttempt"> | Date | string
    student?: XOR<UserScalarRelationFilter, UserWhereInput>
    quiz?: XOR<QuizScalarRelationFilter, QuizWhereInput>
  }, "id">

  export type QuizAttemptOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    quizId?: SortOrder
    score?: SortOrder
    answers?: SortOrder
    submittedAt?: SortOrder
    _count?: QuizAttemptCountOrderByAggregateInput
    _avg?: QuizAttemptAvgOrderByAggregateInput
    _max?: QuizAttemptMaxOrderByAggregateInput
    _min?: QuizAttemptMinOrderByAggregateInput
    _sum?: QuizAttemptSumOrderByAggregateInput
  }

  export type QuizAttemptScalarWhereWithAggregatesInput = {
    AND?: QuizAttemptScalarWhereWithAggregatesInput | QuizAttemptScalarWhereWithAggregatesInput[]
    OR?: QuizAttemptScalarWhereWithAggregatesInput[]
    NOT?: QuizAttemptScalarWhereWithAggregatesInput | QuizAttemptScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"QuizAttempt"> | string
    studentId?: StringWithAggregatesFilter<"QuizAttempt"> | string
    quizId?: StringWithAggregatesFilter<"QuizAttempt"> | string
    score?: FloatWithAggregatesFilter<"QuizAttempt"> | number
    answers?: StringNullableListFilter<"QuizAttempt">
    submittedAt?: DateTimeWithAggregatesFilter<"QuizAttempt"> | Date | string
  }

  export type ProgressWhereInput = {
    AND?: ProgressWhereInput | ProgressWhereInput[]
    OR?: ProgressWhereInput[]
    NOT?: ProgressWhereInput | ProgressWhereInput[]
    id?: StringFilter<"Progress"> | string
    studentId?: StringFilter<"Progress"> | string
    courseId?: StringFilter<"Progress"> | string
    progressPercent?: FloatFilter<"Progress"> | number
    completed?: BoolFilter<"Progress"> | boolean
    student?: XOR<UserScalarRelationFilter, UserWhereInput>
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
  }

  export type ProgressOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrder
    progressPercent?: SortOrder
    completed?: SortOrder
    student?: UserOrderByWithRelationInput
    course?: CourseOrderByWithRelationInput
  }

  export type ProgressWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProgressWhereInput | ProgressWhereInput[]
    OR?: ProgressWhereInput[]
    NOT?: ProgressWhereInput | ProgressWhereInput[]
    studentId?: StringFilter<"Progress"> | string
    courseId?: StringFilter<"Progress"> | string
    progressPercent?: FloatFilter<"Progress"> | number
    completed?: BoolFilter<"Progress"> | boolean
    student?: XOR<UserScalarRelationFilter, UserWhereInput>
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
  }, "id">

  export type ProgressOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrder
    progressPercent?: SortOrder
    completed?: SortOrder
    _count?: ProgressCountOrderByAggregateInput
    _avg?: ProgressAvgOrderByAggregateInput
    _max?: ProgressMaxOrderByAggregateInput
    _min?: ProgressMinOrderByAggregateInput
    _sum?: ProgressSumOrderByAggregateInput
  }

  export type ProgressScalarWhereWithAggregatesInput = {
    AND?: ProgressScalarWhereWithAggregatesInput | ProgressScalarWhereWithAggregatesInput[]
    OR?: ProgressScalarWhereWithAggregatesInput[]
    NOT?: ProgressScalarWhereWithAggregatesInput | ProgressScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Progress"> | string
    studentId?: StringWithAggregatesFilter<"Progress"> | string
    courseId?: StringWithAggregatesFilter<"Progress"> | string
    progressPercent?: FloatWithAggregatesFilter<"Progress"> | number
    completed?: BoolWithAggregatesFilter<"Progress"> | boolean
  }

  export type FeedbackWhereInput = {
    AND?: FeedbackWhereInput | FeedbackWhereInput[]
    OR?: FeedbackWhereInput[]
    NOT?: FeedbackWhereInput | FeedbackWhereInput[]
    id?: StringFilter<"Feedback"> | string
    userId?: StringFilter<"Feedback"> | string
    courseId?: StringFilter<"Feedback"> | string
    rating?: IntFilter<"Feedback"> | number
    comment?: StringFilter<"Feedback"> | string
    createdAt?: DateTimeFilter<"Feedback"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
  }

  export type FeedbackOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    courseId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    course?: CourseOrderByWithRelationInput
  }

  export type FeedbackWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FeedbackWhereInput | FeedbackWhereInput[]
    OR?: FeedbackWhereInput[]
    NOT?: FeedbackWhereInput | FeedbackWhereInput[]
    userId?: StringFilter<"Feedback"> | string
    courseId?: StringFilter<"Feedback"> | string
    rating?: IntFilter<"Feedback"> | number
    comment?: StringFilter<"Feedback"> | string
    createdAt?: DateTimeFilter<"Feedback"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
  }, "id">

  export type FeedbackOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    courseId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
    _count?: FeedbackCountOrderByAggregateInput
    _avg?: FeedbackAvgOrderByAggregateInput
    _max?: FeedbackMaxOrderByAggregateInput
    _min?: FeedbackMinOrderByAggregateInput
    _sum?: FeedbackSumOrderByAggregateInput
  }

  export type FeedbackScalarWhereWithAggregatesInput = {
    AND?: FeedbackScalarWhereWithAggregatesInput | FeedbackScalarWhereWithAggregatesInput[]
    OR?: FeedbackScalarWhereWithAggregatesInput[]
    NOT?: FeedbackScalarWhereWithAggregatesInput | FeedbackScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Feedback"> | string
    userId?: StringWithAggregatesFilter<"Feedback"> | string
    courseId?: StringWithAggregatesFilter<"Feedback"> | string
    rating?: IntWithAggregatesFilter<"Feedback"> | number
    comment?: StringWithAggregatesFilter<"Feedback"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Feedback"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    courses?: CourseListRelationFilter
    feedbacks?: FeedbackListRelationFilter
    enrollments?: EnrollmentListRelationFilter
    quizAttempts?: QuizAttemptListRelationFilter
    progresses?: ProgressListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    courses?: CourseOrderByRelationAggregateInput
    feedbacks?: FeedbackOrderByRelationAggregateInput
    enrollments?: EnrollmentOrderByRelationAggregateInput
    quizAttempts?: QuizAttemptOrderByRelationAggregateInput
    progresses?: ProgressOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    courses?: CourseListRelationFilter
    feedbacks?: FeedbackListRelationFilter
    enrollments?: EnrollmentListRelationFilter
    quizAttempts?: QuizAttemptListRelationFilter
    progresses?: ProgressListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type CourseCreateInput = {
    id?: string
    title: string
    description: string
    thumbnail: string
    price: number
    createdAt?: Date | string
    teacher: UserCreateNestedOneWithoutCoursesInput
    contents?: CourseContentCreateNestedManyWithoutCourseInput
    enrollments?: EnrollmentCreateNestedManyWithoutCourseInput
    feedbacks?: FeedbackCreateNestedManyWithoutCourseInput
    quizzes?: QuizCreateNestedManyWithoutCourseInput
    progresses?: ProgressCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateInput = {
    id?: string
    title: string
    description: string
    thumbnail: string
    price: number
    teacherId: string
    createdAt?: Date | string
    contents?: CourseContentUncheckedCreateNestedManyWithoutCourseInput
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutCourseInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutCourseInput
    quizzes?: QuizUncheckedCreateNestedManyWithoutCourseInput
    progresses?: ProgressUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnail?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacher?: UserUpdateOneRequiredWithoutCoursesNestedInput
    contents?: CourseContentUpdateManyWithoutCourseNestedInput
    enrollments?: EnrollmentUpdateManyWithoutCourseNestedInput
    feedbacks?: FeedbackUpdateManyWithoutCourseNestedInput
    quizzes?: QuizUpdateManyWithoutCourseNestedInput
    progresses?: ProgressUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnail?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    teacherId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contents?: CourseContentUncheckedUpdateManyWithoutCourseNestedInput
    enrollments?: EnrollmentUncheckedUpdateManyWithoutCourseNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutCourseNestedInput
    quizzes?: QuizUncheckedUpdateManyWithoutCourseNestedInput
    progresses?: ProgressUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type CourseCreateManyInput = {
    id?: string
    title: string
    description: string
    thumbnail: string
    price: number
    teacherId: string
    createdAt?: Date | string
  }

  export type CourseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnail?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnail?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    teacherId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseContentCreateInput = {
    id?: string
    title: string
    type: $Enums.ContentType
    url: string
    orderIndex: number
    course: CourseCreateNestedOneWithoutContentsInput
  }

  export type CourseContentUncheckedCreateInput = {
    id?: string
    title: string
    type: $Enums.ContentType
    url: string
    courseId: string
    orderIndex: number
  }

  export type CourseContentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: EnumContentTypeFieldUpdateOperationsInput | $Enums.ContentType
    url?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    course?: CourseUpdateOneRequiredWithoutContentsNestedInput
  }

  export type CourseContentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: EnumContentTypeFieldUpdateOperationsInput | $Enums.ContentType
    url?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
  }

  export type CourseContentCreateManyInput = {
    id?: string
    title: string
    type: $Enums.ContentType
    url: string
    courseId: string
    orderIndex: number
  }

  export type CourseContentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: EnumContentTypeFieldUpdateOperationsInput | $Enums.ContentType
    url?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
  }

  export type CourseContentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: EnumContentTypeFieldUpdateOperationsInput | $Enums.ContentType
    url?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
  }

  export type EnrollmentCreateInput = {
    id?: string
    enrolledAt?: Date | string
    student: UserCreateNestedOneWithoutEnrollmentsInput
    course: CourseCreateNestedOneWithoutEnrollmentsInput
  }

  export type EnrollmentUncheckedCreateInput = {
    id?: string
    studentId: string
    courseId: string
    enrolledAt?: Date | string
  }

  export type EnrollmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: UserUpdateOneRequiredWithoutEnrollmentsNestedInput
    course?: CourseUpdateOneRequiredWithoutEnrollmentsNestedInput
  }

  export type EnrollmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnrollmentCreateManyInput = {
    id?: string
    studentId: string
    courseId: string
    enrolledAt?: Date | string
  }

  export type EnrollmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnrollmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuizCreateInput = {
    id?: string
    title: string
    type: $Enums.QuizType
    course: CourseCreateNestedOneWithoutQuizzesInput
    questions?: QuizQuestionCreateNestedManyWithoutQuizInput
    attempts?: QuizAttemptCreateNestedManyWithoutQuizInput
  }

  export type QuizUncheckedCreateInput = {
    id?: string
    title: string
    type: $Enums.QuizType
    courseId: string
    questions?: QuizQuestionUncheckedCreateNestedManyWithoutQuizInput
    attempts?: QuizAttemptUncheckedCreateNestedManyWithoutQuizInput
  }

  export type QuizUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: EnumQuizTypeFieldUpdateOperationsInput | $Enums.QuizType
    course?: CourseUpdateOneRequiredWithoutQuizzesNestedInput
    questions?: QuizQuestionUpdateManyWithoutQuizNestedInput
    attempts?: QuizAttemptUpdateManyWithoutQuizNestedInput
  }

  export type QuizUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: EnumQuizTypeFieldUpdateOperationsInput | $Enums.QuizType
    courseId?: StringFieldUpdateOperationsInput | string
    questions?: QuizQuestionUncheckedUpdateManyWithoutQuizNestedInput
    attempts?: QuizAttemptUncheckedUpdateManyWithoutQuizNestedInput
  }

  export type QuizCreateManyInput = {
    id?: string
    title: string
    type: $Enums.QuizType
    courseId: string
  }

  export type QuizUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: EnumQuizTypeFieldUpdateOperationsInput | $Enums.QuizType
  }

  export type QuizUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: EnumQuizTypeFieldUpdateOperationsInput | $Enums.QuizType
    courseId?: StringFieldUpdateOperationsInput | string
  }

  export type QuizQuestionCreateInput = {
    id?: string
    questionText: string
    options?: QuizQuestionCreateoptionsInput | string[]
    correctAnswer: string
    quiz: QuizCreateNestedOneWithoutQuestionsInput
  }

  export type QuizQuestionUncheckedCreateInput = {
    id?: string
    quizId: string
    questionText: string
    options?: QuizQuestionCreateoptionsInput | string[]
    correctAnswer: string
  }

  export type QuizQuestionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionText?: StringFieldUpdateOperationsInput | string
    options?: QuizQuestionUpdateoptionsInput | string[]
    correctAnswer?: StringFieldUpdateOperationsInput | string
    quiz?: QuizUpdateOneRequiredWithoutQuestionsNestedInput
  }

  export type QuizQuestionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quizId?: StringFieldUpdateOperationsInput | string
    questionText?: StringFieldUpdateOperationsInput | string
    options?: QuizQuestionUpdateoptionsInput | string[]
    correctAnswer?: StringFieldUpdateOperationsInput | string
  }

  export type QuizQuestionCreateManyInput = {
    id?: string
    quizId: string
    questionText: string
    options?: QuizQuestionCreateoptionsInput | string[]
    correctAnswer: string
  }

  export type QuizQuestionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionText?: StringFieldUpdateOperationsInput | string
    options?: QuizQuestionUpdateoptionsInput | string[]
    correctAnswer?: StringFieldUpdateOperationsInput | string
  }

  export type QuizQuestionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    quizId?: StringFieldUpdateOperationsInput | string
    questionText?: StringFieldUpdateOperationsInput | string
    options?: QuizQuestionUpdateoptionsInput | string[]
    correctAnswer?: StringFieldUpdateOperationsInput | string
  }

  export type QuizAttemptCreateInput = {
    id?: string
    score: number
    answers?: QuizAttemptCreateanswersInput | string[]
    submittedAt?: Date | string
    student: UserCreateNestedOneWithoutQuizAttemptsInput
    quiz: QuizCreateNestedOneWithoutAttemptsInput
  }

  export type QuizAttemptUncheckedCreateInput = {
    id?: string
    studentId: string
    quizId: string
    score: number
    answers?: QuizAttemptCreateanswersInput | string[]
    submittedAt?: Date | string
  }

  export type QuizAttemptUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: FloatFieldUpdateOperationsInput | number
    answers?: QuizAttemptUpdateanswersInput | string[]
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: UserUpdateOneRequiredWithoutQuizAttemptsNestedInput
    quiz?: QuizUpdateOneRequiredWithoutAttemptsNestedInput
  }

  export type QuizAttemptUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    quizId?: StringFieldUpdateOperationsInput | string
    score?: FloatFieldUpdateOperationsInput | number
    answers?: QuizAttemptUpdateanswersInput | string[]
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuizAttemptCreateManyInput = {
    id?: string
    studentId: string
    quizId: string
    score: number
    answers?: QuizAttemptCreateanswersInput | string[]
    submittedAt?: Date | string
  }

  export type QuizAttemptUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: FloatFieldUpdateOperationsInput | number
    answers?: QuizAttemptUpdateanswersInput | string[]
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuizAttemptUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    quizId?: StringFieldUpdateOperationsInput | string
    score?: FloatFieldUpdateOperationsInput | number
    answers?: QuizAttemptUpdateanswersInput | string[]
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgressCreateInput = {
    id?: string
    progressPercent: number
    completed: boolean
    student: UserCreateNestedOneWithoutProgressesInput
    course: CourseCreateNestedOneWithoutProgressesInput
  }

  export type ProgressUncheckedCreateInput = {
    id?: string
    studentId: string
    courseId: string
    progressPercent: number
    completed: boolean
  }

  export type ProgressUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    progressPercent?: FloatFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    student?: UserUpdateOneRequiredWithoutProgressesNestedInput
    course?: CourseUpdateOneRequiredWithoutProgressesNestedInput
  }

  export type ProgressUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    progressPercent?: FloatFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProgressCreateManyInput = {
    id?: string
    studentId: string
    courseId: string
    progressPercent: number
    completed: boolean
  }

  export type ProgressUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    progressPercent?: FloatFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProgressUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    progressPercent?: FloatFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type FeedbackCreateInput = {
    id?: string
    rating: number
    comment: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFeedbacksInput
    course: CourseCreateNestedOneWithoutFeedbacksInput
  }

  export type FeedbackUncheckedCreateInput = {
    id?: string
    userId: string
    courseId: string
    rating: number
    comment: string
    createdAt?: Date | string
  }

  export type FeedbackUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFeedbacksNestedInput
    course?: CourseUpdateOneRequiredWithoutFeedbacksNestedInput
  }

  export type FeedbackUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackCreateManyInput = {
    id?: string
    userId: string
    courseId: string
    rating: number
    comment: string
    createdAt?: Date | string
  }

  export type FeedbackUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    courses?: CourseCreateNestedManyWithoutTeacherInput
    feedbacks?: FeedbackCreateNestedManyWithoutUserInput
    enrollments?: EnrollmentCreateNestedManyWithoutStudentInput
    quizAttempts?: QuizAttemptCreateNestedManyWithoutStudentInput
    progresses?: ProgressCreateNestedManyWithoutStudentInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    courses?: CourseUncheckedCreateNestedManyWithoutTeacherInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutUserInput
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutStudentInput
    quizAttempts?: QuizAttemptUncheckedCreateNestedManyWithoutStudentInput
    progresses?: ProgressUncheckedCreateNestedManyWithoutStudentInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    courses?: CourseUpdateManyWithoutTeacherNestedInput
    feedbacks?: FeedbackUpdateManyWithoutUserNestedInput
    enrollments?: EnrollmentUpdateManyWithoutStudentNestedInput
    quizAttempts?: QuizAttemptUpdateManyWithoutStudentNestedInput
    progresses?: ProgressUpdateManyWithoutStudentNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    courses?: CourseUncheckedUpdateManyWithoutTeacherNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutUserNestedInput
    enrollments?: EnrollmentUncheckedUpdateManyWithoutStudentNestedInput
    quizAttempts?: QuizAttemptUncheckedUpdateManyWithoutStudentNestedInput
    progresses?: ProgressUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type CourseContentListRelationFilter = {
    every?: CourseContentWhereInput
    some?: CourseContentWhereInput
    none?: CourseContentWhereInput
  }

  export type EnrollmentListRelationFilter = {
    every?: EnrollmentWhereInput
    some?: EnrollmentWhereInput
    none?: EnrollmentWhereInput
  }

  export type FeedbackListRelationFilter = {
    every?: FeedbackWhereInput
    some?: FeedbackWhereInput
    none?: FeedbackWhereInput
  }

  export type QuizListRelationFilter = {
    every?: QuizWhereInput
    some?: QuizWhereInput
    none?: QuizWhereInput
  }

  export type ProgressListRelationFilter = {
    every?: ProgressWhereInput
    some?: ProgressWhereInput
    none?: ProgressWhereInput
  }

  export type CourseContentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EnrollmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FeedbackOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type QuizOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProgressOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CourseCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    thumbnail?: SortOrder
    price?: SortOrder
    teacherId?: SortOrder
    createdAt?: SortOrder
  }

  export type CourseAvgOrderByAggregateInput = {
    price?: SortOrder
  }

  export type CourseMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    thumbnail?: SortOrder
    price?: SortOrder
    teacherId?: SortOrder
    createdAt?: SortOrder
  }

  export type CourseMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    thumbnail?: SortOrder
    price?: SortOrder
    teacherId?: SortOrder
    createdAt?: SortOrder
  }

  export type CourseSumOrderByAggregateInput = {
    price?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumContentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ContentType | EnumContentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ContentType[] | ListEnumContentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ContentType[] | ListEnumContentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumContentTypeFilter<$PrismaModel> | $Enums.ContentType
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type CourseScalarRelationFilter = {
    is?: CourseWhereInput
    isNot?: CourseWhereInput
  }

  export type CourseContentCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    type?: SortOrder
    url?: SortOrder
    courseId?: SortOrder
    orderIndex?: SortOrder
  }

  export type CourseContentAvgOrderByAggregateInput = {
    orderIndex?: SortOrder
  }

  export type CourseContentMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    type?: SortOrder
    url?: SortOrder
    courseId?: SortOrder
    orderIndex?: SortOrder
  }

  export type CourseContentMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    type?: SortOrder
    url?: SortOrder
    courseId?: SortOrder
    orderIndex?: SortOrder
  }

  export type CourseContentSumOrderByAggregateInput = {
    orderIndex?: SortOrder
  }

  export type EnumContentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ContentType | EnumContentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ContentType[] | ListEnumContentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ContentType[] | ListEnumContentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumContentTypeWithAggregatesFilter<$PrismaModel> | $Enums.ContentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumContentTypeFilter<$PrismaModel>
    _max?: NestedEnumContentTypeFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnrollmentCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrder
    enrolledAt?: SortOrder
  }

  export type EnrollmentMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrder
    enrolledAt?: SortOrder
  }

  export type EnrollmentMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrder
    enrolledAt?: SortOrder
  }

  export type EnumQuizTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.QuizType | EnumQuizTypeFieldRefInput<$PrismaModel>
    in?: $Enums.QuizType[] | ListEnumQuizTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuizType[] | ListEnumQuizTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumQuizTypeFilter<$PrismaModel> | $Enums.QuizType
  }

  export type QuizQuestionListRelationFilter = {
    every?: QuizQuestionWhereInput
    some?: QuizQuestionWhereInput
    none?: QuizQuestionWhereInput
  }

  export type QuizAttemptListRelationFilter = {
    every?: QuizAttemptWhereInput
    some?: QuizAttemptWhereInput
    none?: QuizAttemptWhereInput
  }

  export type QuizQuestionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type QuizAttemptOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type QuizCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    type?: SortOrder
    courseId?: SortOrder
  }

  export type QuizMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    type?: SortOrder
    courseId?: SortOrder
  }

  export type QuizMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    type?: SortOrder
    courseId?: SortOrder
  }

  export type EnumQuizTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuizType | EnumQuizTypeFieldRefInput<$PrismaModel>
    in?: $Enums.QuizType[] | ListEnumQuizTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuizType[] | ListEnumQuizTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumQuizTypeWithAggregatesFilter<$PrismaModel> | $Enums.QuizType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumQuizTypeFilter<$PrismaModel>
    _max?: NestedEnumQuizTypeFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type QuizScalarRelationFilter = {
    is?: QuizWhereInput
    isNot?: QuizWhereInput
  }

  export type QuizQuestionCountOrderByAggregateInput = {
    id?: SortOrder
    quizId?: SortOrder
    questionText?: SortOrder
    options?: SortOrder
    correctAnswer?: SortOrder
  }

  export type QuizQuestionMaxOrderByAggregateInput = {
    id?: SortOrder
    quizId?: SortOrder
    questionText?: SortOrder
    correctAnswer?: SortOrder
  }

  export type QuizQuestionMinOrderByAggregateInput = {
    id?: SortOrder
    quizId?: SortOrder
    questionText?: SortOrder
    correctAnswer?: SortOrder
  }

  export type QuizAttemptCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    quizId?: SortOrder
    score?: SortOrder
    answers?: SortOrder
    submittedAt?: SortOrder
  }

  export type QuizAttemptAvgOrderByAggregateInput = {
    score?: SortOrder
  }

  export type QuizAttemptMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    quizId?: SortOrder
    score?: SortOrder
    submittedAt?: SortOrder
  }

  export type QuizAttemptMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    quizId?: SortOrder
    score?: SortOrder
    submittedAt?: SortOrder
  }

  export type QuizAttemptSumOrderByAggregateInput = {
    score?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ProgressCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrder
    progressPercent?: SortOrder
    completed?: SortOrder
  }

  export type ProgressAvgOrderByAggregateInput = {
    progressPercent?: SortOrder
  }

  export type ProgressMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrder
    progressPercent?: SortOrder
    completed?: SortOrder
  }

  export type ProgressMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrder
    progressPercent?: SortOrder
    completed?: SortOrder
  }

  export type ProgressSumOrderByAggregateInput = {
    progressPercent?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type FeedbackCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    courseId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
  }

  export type FeedbackAvgOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type FeedbackMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    courseId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
  }

  export type FeedbackMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    courseId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
  }

  export type FeedbackSumOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type CourseListRelationFilter = {
    every?: CourseWhereInput
    some?: CourseWhereInput
    none?: CourseWhereInput
  }

  export type CourseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type UserCreateNestedOneWithoutCoursesInput = {
    create?: XOR<UserCreateWithoutCoursesInput, UserUncheckedCreateWithoutCoursesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCoursesInput
    connect?: UserWhereUniqueInput
  }

  export type CourseContentCreateNestedManyWithoutCourseInput = {
    create?: XOR<CourseContentCreateWithoutCourseInput, CourseContentUncheckedCreateWithoutCourseInput> | CourseContentCreateWithoutCourseInput[] | CourseContentUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: CourseContentCreateOrConnectWithoutCourseInput | CourseContentCreateOrConnectWithoutCourseInput[]
    createMany?: CourseContentCreateManyCourseInputEnvelope
    connect?: CourseContentWhereUniqueInput | CourseContentWhereUniqueInput[]
  }

  export type EnrollmentCreateNestedManyWithoutCourseInput = {
    create?: XOR<EnrollmentCreateWithoutCourseInput, EnrollmentUncheckedCreateWithoutCourseInput> | EnrollmentCreateWithoutCourseInput[] | EnrollmentUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutCourseInput | EnrollmentCreateOrConnectWithoutCourseInput[]
    createMany?: EnrollmentCreateManyCourseInputEnvelope
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
  }

  export type FeedbackCreateNestedManyWithoutCourseInput = {
    create?: XOR<FeedbackCreateWithoutCourseInput, FeedbackUncheckedCreateWithoutCourseInput> | FeedbackCreateWithoutCourseInput[] | FeedbackUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutCourseInput | FeedbackCreateOrConnectWithoutCourseInput[]
    createMany?: FeedbackCreateManyCourseInputEnvelope
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
  }

  export type QuizCreateNestedManyWithoutCourseInput = {
    create?: XOR<QuizCreateWithoutCourseInput, QuizUncheckedCreateWithoutCourseInput> | QuizCreateWithoutCourseInput[] | QuizUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: QuizCreateOrConnectWithoutCourseInput | QuizCreateOrConnectWithoutCourseInput[]
    createMany?: QuizCreateManyCourseInputEnvelope
    connect?: QuizWhereUniqueInput | QuizWhereUniqueInput[]
  }

  export type ProgressCreateNestedManyWithoutCourseInput = {
    create?: XOR<ProgressCreateWithoutCourseInput, ProgressUncheckedCreateWithoutCourseInput> | ProgressCreateWithoutCourseInput[] | ProgressUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: ProgressCreateOrConnectWithoutCourseInput | ProgressCreateOrConnectWithoutCourseInput[]
    createMany?: ProgressCreateManyCourseInputEnvelope
    connect?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[]
  }

  export type CourseContentUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<CourseContentCreateWithoutCourseInput, CourseContentUncheckedCreateWithoutCourseInput> | CourseContentCreateWithoutCourseInput[] | CourseContentUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: CourseContentCreateOrConnectWithoutCourseInput | CourseContentCreateOrConnectWithoutCourseInput[]
    createMany?: CourseContentCreateManyCourseInputEnvelope
    connect?: CourseContentWhereUniqueInput | CourseContentWhereUniqueInput[]
  }

  export type EnrollmentUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<EnrollmentCreateWithoutCourseInput, EnrollmentUncheckedCreateWithoutCourseInput> | EnrollmentCreateWithoutCourseInput[] | EnrollmentUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutCourseInput | EnrollmentCreateOrConnectWithoutCourseInput[]
    createMany?: EnrollmentCreateManyCourseInputEnvelope
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
  }

  export type FeedbackUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<FeedbackCreateWithoutCourseInput, FeedbackUncheckedCreateWithoutCourseInput> | FeedbackCreateWithoutCourseInput[] | FeedbackUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutCourseInput | FeedbackCreateOrConnectWithoutCourseInput[]
    createMany?: FeedbackCreateManyCourseInputEnvelope
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
  }

  export type QuizUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<QuizCreateWithoutCourseInput, QuizUncheckedCreateWithoutCourseInput> | QuizCreateWithoutCourseInput[] | QuizUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: QuizCreateOrConnectWithoutCourseInput | QuizCreateOrConnectWithoutCourseInput[]
    createMany?: QuizCreateManyCourseInputEnvelope
    connect?: QuizWhereUniqueInput | QuizWhereUniqueInput[]
  }

  export type ProgressUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<ProgressCreateWithoutCourseInput, ProgressUncheckedCreateWithoutCourseInput> | ProgressCreateWithoutCourseInput[] | ProgressUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: ProgressCreateOrConnectWithoutCourseInput | ProgressCreateOrConnectWithoutCourseInput[]
    createMany?: ProgressCreateManyCourseInputEnvelope
    connect?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneRequiredWithoutCoursesNestedInput = {
    create?: XOR<UserCreateWithoutCoursesInput, UserUncheckedCreateWithoutCoursesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCoursesInput
    upsert?: UserUpsertWithoutCoursesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCoursesInput, UserUpdateWithoutCoursesInput>, UserUncheckedUpdateWithoutCoursesInput>
  }

  export type CourseContentUpdateManyWithoutCourseNestedInput = {
    create?: XOR<CourseContentCreateWithoutCourseInput, CourseContentUncheckedCreateWithoutCourseInput> | CourseContentCreateWithoutCourseInput[] | CourseContentUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: CourseContentCreateOrConnectWithoutCourseInput | CourseContentCreateOrConnectWithoutCourseInput[]
    upsert?: CourseContentUpsertWithWhereUniqueWithoutCourseInput | CourseContentUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: CourseContentCreateManyCourseInputEnvelope
    set?: CourseContentWhereUniqueInput | CourseContentWhereUniqueInput[]
    disconnect?: CourseContentWhereUniqueInput | CourseContentWhereUniqueInput[]
    delete?: CourseContentWhereUniqueInput | CourseContentWhereUniqueInput[]
    connect?: CourseContentWhereUniqueInput | CourseContentWhereUniqueInput[]
    update?: CourseContentUpdateWithWhereUniqueWithoutCourseInput | CourseContentUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: CourseContentUpdateManyWithWhereWithoutCourseInput | CourseContentUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: CourseContentScalarWhereInput | CourseContentScalarWhereInput[]
  }

  export type EnrollmentUpdateManyWithoutCourseNestedInput = {
    create?: XOR<EnrollmentCreateWithoutCourseInput, EnrollmentUncheckedCreateWithoutCourseInput> | EnrollmentCreateWithoutCourseInput[] | EnrollmentUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutCourseInput | EnrollmentCreateOrConnectWithoutCourseInput[]
    upsert?: EnrollmentUpsertWithWhereUniqueWithoutCourseInput | EnrollmentUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: EnrollmentCreateManyCourseInputEnvelope
    set?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    disconnect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    delete?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    update?: EnrollmentUpdateWithWhereUniqueWithoutCourseInput | EnrollmentUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: EnrollmentUpdateManyWithWhereWithoutCourseInput | EnrollmentUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
  }

  export type FeedbackUpdateManyWithoutCourseNestedInput = {
    create?: XOR<FeedbackCreateWithoutCourseInput, FeedbackUncheckedCreateWithoutCourseInput> | FeedbackCreateWithoutCourseInput[] | FeedbackUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutCourseInput | FeedbackCreateOrConnectWithoutCourseInput[]
    upsert?: FeedbackUpsertWithWhereUniqueWithoutCourseInput | FeedbackUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: FeedbackCreateManyCourseInputEnvelope
    set?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    disconnect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    delete?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    update?: FeedbackUpdateWithWhereUniqueWithoutCourseInput | FeedbackUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: FeedbackUpdateManyWithWhereWithoutCourseInput | FeedbackUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
  }

  export type QuizUpdateManyWithoutCourseNestedInput = {
    create?: XOR<QuizCreateWithoutCourseInput, QuizUncheckedCreateWithoutCourseInput> | QuizCreateWithoutCourseInput[] | QuizUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: QuizCreateOrConnectWithoutCourseInput | QuizCreateOrConnectWithoutCourseInput[]
    upsert?: QuizUpsertWithWhereUniqueWithoutCourseInput | QuizUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: QuizCreateManyCourseInputEnvelope
    set?: QuizWhereUniqueInput | QuizWhereUniqueInput[]
    disconnect?: QuizWhereUniqueInput | QuizWhereUniqueInput[]
    delete?: QuizWhereUniqueInput | QuizWhereUniqueInput[]
    connect?: QuizWhereUniqueInput | QuizWhereUniqueInput[]
    update?: QuizUpdateWithWhereUniqueWithoutCourseInput | QuizUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: QuizUpdateManyWithWhereWithoutCourseInput | QuizUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: QuizScalarWhereInput | QuizScalarWhereInput[]
  }

  export type ProgressUpdateManyWithoutCourseNestedInput = {
    create?: XOR<ProgressCreateWithoutCourseInput, ProgressUncheckedCreateWithoutCourseInput> | ProgressCreateWithoutCourseInput[] | ProgressUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: ProgressCreateOrConnectWithoutCourseInput | ProgressCreateOrConnectWithoutCourseInput[]
    upsert?: ProgressUpsertWithWhereUniqueWithoutCourseInput | ProgressUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: ProgressCreateManyCourseInputEnvelope
    set?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[]
    disconnect?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[]
    delete?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[]
    connect?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[]
    update?: ProgressUpdateWithWhereUniqueWithoutCourseInput | ProgressUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: ProgressUpdateManyWithWhereWithoutCourseInput | ProgressUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: ProgressScalarWhereInput | ProgressScalarWhereInput[]
  }

  export type CourseContentUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: XOR<CourseContentCreateWithoutCourseInput, CourseContentUncheckedCreateWithoutCourseInput> | CourseContentCreateWithoutCourseInput[] | CourseContentUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: CourseContentCreateOrConnectWithoutCourseInput | CourseContentCreateOrConnectWithoutCourseInput[]
    upsert?: CourseContentUpsertWithWhereUniqueWithoutCourseInput | CourseContentUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: CourseContentCreateManyCourseInputEnvelope
    set?: CourseContentWhereUniqueInput | CourseContentWhereUniqueInput[]
    disconnect?: CourseContentWhereUniqueInput | CourseContentWhereUniqueInput[]
    delete?: CourseContentWhereUniqueInput | CourseContentWhereUniqueInput[]
    connect?: CourseContentWhereUniqueInput | CourseContentWhereUniqueInput[]
    update?: CourseContentUpdateWithWhereUniqueWithoutCourseInput | CourseContentUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: CourseContentUpdateManyWithWhereWithoutCourseInput | CourseContentUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: CourseContentScalarWhereInput | CourseContentScalarWhereInput[]
  }

  export type EnrollmentUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: XOR<EnrollmentCreateWithoutCourseInput, EnrollmentUncheckedCreateWithoutCourseInput> | EnrollmentCreateWithoutCourseInput[] | EnrollmentUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutCourseInput | EnrollmentCreateOrConnectWithoutCourseInput[]
    upsert?: EnrollmentUpsertWithWhereUniqueWithoutCourseInput | EnrollmentUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: EnrollmentCreateManyCourseInputEnvelope
    set?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    disconnect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    delete?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    update?: EnrollmentUpdateWithWhereUniqueWithoutCourseInput | EnrollmentUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: EnrollmentUpdateManyWithWhereWithoutCourseInput | EnrollmentUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
  }

  export type FeedbackUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: XOR<FeedbackCreateWithoutCourseInput, FeedbackUncheckedCreateWithoutCourseInput> | FeedbackCreateWithoutCourseInput[] | FeedbackUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutCourseInput | FeedbackCreateOrConnectWithoutCourseInput[]
    upsert?: FeedbackUpsertWithWhereUniqueWithoutCourseInput | FeedbackUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: FeedbackCreateManyCourseInputEnvelope
    set?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    disconnect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    delete?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    update?: FeedbackUpdateWithWhereUniqueWithoutCourseInput | FeedbackUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: FeedbackUpdateManyWithWhereWithoutCourseInput | FeedbackUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
  }

  export type QuizUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: XOR<QuizCreateWithoutCourseInput, QuizUncheckedCreateWithoutCourseInput> | QuizCreateWithoutCourseInput[] | QuizUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: QuizCreateOrConnectWithoutCourseInput | QuizCreateOrConnectWithoutCourseInput[]
    upsert?: QuizUpsertWithWhereUniqueWithoutCourseInput | QuizUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: QuizCreateManyCourseInputEnvelope
    set?: QuizWhereUniqueInput | QuizWhereUniqueInput[]
    disconnect?: QuizWhereUniqueInput | QuizWhereUniqueInput[]
    delete?: QuizWhereUniqueInput | QuizWhereUniqueInput[]
    connect?: QuizWhereUniqueInput | QuizWhereUniqueInput[]
    update?: QuizUpdateWithWhereUniqueWithoutCourseInput | QuizUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: QuizUpdateManyWithWhereWithoutCourseInput | QuizUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: QuizScalarWhereInput | QuizScalarWhereInput[]
  }

  export type ProgressUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: XOR<ProgressCreateWithoutCourseInput, ProgressUncheckedCreateWithoutCourseInput> | ProgressCreateWithoutCourseInput[] | ProgressUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: ProgressCreateOrConnectWithoutCourseInput | ProgressCreateOrConnectWithoutCourseInput[]
    upsert?: ProgressUpsertWithWhereUniqueWithoutCourseInput | ProgressUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: ProgressCreateManyCourseInputEnvelope
    set?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[]
    disconnect?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[]
    delete?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[]
    connect?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[]
    update?: ProgressUpdateWithWhereUniqueWithoutCourseInput | ProgressUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: ProgressUpdateManyWithWhereWithoutCourseInput | ProgressUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: ProgressScalarWhereInput | ProgressScalarWhereInput[]
  }

  export type CourseCreateNestedOneWithoutContentsInput = {
    create?: XOR<CourseCreateWithoutContentsInput, CourseUncheckedCreateWithoutContentsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutContentsInput
    connect?: CourseWhereUniqueInput
  }

  export type EnumContentTypeFieldUpdateOperationsInput = {
    set?: $Enums.ContentType
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CourseUpdateOneRequiredWithoutContentsNestedInput = {
    create?: XOR<CourseCreateWithoutContentsInput, CourseUncheckedCreateWithoutContentsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutContentsInput
    upsert?: CourseUpsertWithoutContentsInput
    connect?: CourseWhereUniqueInput
    update?: XOR<XOR<CourseUpdateToOneWithWhereWithoutContentsInput, CourseUpdateWithoutContentsInput>, CourseUncheckedUpdateWithoutContentsInput>
  }

  export type UserCreateNestedOneWithoutEnrollmentsInput = {
    create?: XOR<UserCreateWithoutEnrollmentsInput, UserUncheckedCreateWithoutEnrollmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEnrollmentsInput
    connect?: UserWhereUniqueInput
  }

  export type CourseCreateNestedOneWithoutEnrollmentsInput = {
    create?: XOR<CourseCreateWithoutEnrollmentsInput, CourseUncheckedCreateWithoutEnrollmentsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutEnrollmentsInput
    connect?: CourseWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutEnrollmentsNestedInput = {
    create?: XOR<UserCreateWithoutEnrollmentsInput, UserUncheckedCreateWithoutEnrollmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEnrollmentsInput
    upsert?: UserUpsertWithoutEnrollmentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEnrollmentsInput, UserUpdateWithoutEnrollmentsInput>, UserUncheckedUpdateWithoutEnrollmentsInput>
  }

  export type CourseUpdateOneRequiredWithoutEnrollmentsNestedInput = {
    create?: XOR<CourseCreateWithoutEnrollmentsInput, CourseUncheckedCreateWithoutEnrollmentsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutEnrollmentsInput
    upsert?: CourseUpsertWithoutEnrollmentsInput
    connect?: CourseWhereUniqueInput
    update?: XOR<XOR<CourseUpdateToOneWithWhereWithoutEnrollmentsInput, CourseUpdateWithoutEnrollmentsInput>, CourseUncheckedUpdateWithoutEnrollmentsInput>
  }

  export type CourseCreateNestedOneWithoutQuizzesInput = {
    create?: XOR<CourseCreateWithoutQuizzesInput, CourseUncheckedCreateWithoutQuizzesInput>
    connectOrCreate?: CourseCreateOrConnectWithoutQuizzesInput
    connect?: CourseWhereUniqueInput
  }

  export type QuizQuestionCreateNestedManyWithoutQuizInput = {
    create?: XOR<QuizQuestionCreateWithoutQuizInput, QuizQuestionUncheckedCreateWithoutQuizInput> | QuizQuestionCreateWithoutQuizInput[] | QuizQuestionUncheckedCreateWithoutQuizInput[]
    connectOrCreate?: QuizQuestionCreateOrConnectWithoutQuizInput | QuizQuestionCreateOrConnectWithoutQuizInput[]
    createMany?: QuizQuestionCreateManyQuizInputEnvelope
    connect?: QuizQuestionWhereUniqueInput | QuizQuestionWhereUniqueInput[]
  }

  export type QuizAttemptCreateNestedManyWithoutQuizInput = {
    create?: XOR<QuizAttemptCreateWithoutQuizInput, QuizAttemptUncheckedCreateWithoutQuizInput> | QuizAttemptCreateWithoutQuizInput[] | QuizAttemptUncheckedCreateWithoutQuizInput[]
    connectOrCreate?: QuizAttemptCreateOrConnectWithoutQuizInput | QuizAttemptCreateOrConnectWithoutQuizInput[]
    createMany?: QuizAttemptCreateManyQuizInputEnvelope
    connect?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
  }

  export type QuizQuestionUncheckedCreateNestedManyWithoutQuizInput = {
    create?: XOR<QuizQuestionCreateWithoutQuizInput, QuizQuestionUncheckedCreateWithoutQuizInput> | QuizQuestionCreateWithoutQuizInput[] | QuizQuestionUncheckedCreateWithoutQuizInput[]
    connectOrCreate?: QuizQuestionCreateOrConnectWithoutQuizInput | QuizQuestionCreateOrConnectWithoutQuizInput[]
    createMany?: QuizQuestionCreateManyQuizInputEnvelope
    connect?: QuizQuestionWhereUniqueInput | QuizQuestionWhereUniqueInput[]
  }

  export type QuizAttemptUncheckedCreateNestedManyWithoutQuizInput = {
    create?: XOR<QuizAttemptCreateWithoutQuizInput, QuizAttemptUncheckedCreateWithoutQuizInput> | QuizAttemptCreateWithoutQuizInput[] | QuizAttemptUncheckedCreateWithoutQuizInput[]
    connectOrCreate?: QuizAttemptCreateOrConnectWithoutQuizInput | QuizAttemptCreateOrConnectWithoutQuizInput[]
    createMany?: QuizAttemptCreateManyQuizInputEnvelope
    connect?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
  }

  export type EnumQuizTypeFieldUpdateOperationsInput = {
    set?: $Enums.QuizType
  }

  export type CourseUpdateOneRequiredWithoutQuizzesNestedInput = {
    create?: XOR<CourseCreateWithoutQuizzesInput, CourseUncheckedCreateWithoutQuizzesInput>
    connectOrCreate?: CourseCreateOrConnectWithoutQuizzesInput
    upsert?: CourseUpsertWithoutQuizzesInput
    connect?: CourseWhereUniqueInput
    update?: XOR<XOR<CourseUpdateToOneWithWhereWithoutQuizzesInput, CourseUpdateWithoutQuizzesInput>, CourseUncheckedUpdateWithoutQuizzesInput>
  }

  export type QuizQuestionUpdateManyWithoutQuizNestedInput = {
    create?: XOR<QuizQuestionCreateWithoutQuizInput, QuizQuestionUncheckedCreateWithoutQuizInput> | QuizQuestionCreateWithoutQuizInput[] | QuizQuestionUncheckedCreateWithoutQuizInput[]
    connectOrCreate?: QuizQuestionCreateOrConnectWithoutQuizInput | QuizQuestionCreateOrConnectWithoutQuizInput[]
    upsert?: QuizQuestionUpsertWithWhereUniqueWithoutQuizInput | QuizQuestionUpsertWithWhereUniqueWithoutQuizInput[]
    createMany?: QuizQuestionCreateManyQuizInputEnvelope
    set?: QuizQuestionWhereUniqueInput | QuizQuestionWhereUniqueInput[]
    disconnect?: QuizQuestionWhereUniqueInput | QuizQuestionWhereUniqueInput[]
    delete?: QuizQuestionWhereUniqueInput | QuizQuestionWhereUniqueInput[]
    connect?: QuizQuestionWhereUniqueInput | QuizQuestionWhereUniqueInput[]
    update?: QuizQuestionUpdateWithWhereUniqueWithoutQuizInput | QuizQuestionUpdateWithWhereUniqueWithoutQuizInput[]
    updateMany?: QuizQuestionUpdateManyWithWhereWithoutQuizInput | QuizQuestionUpdateManyWithWhereWithoutQuizInput[]
    deleteMany?: QuizQuestionScalarWhereInput | QuizQuestionScalarWhereInput[]
  }

  export type QuizAttemptUpdateManyWithoutQuizNestedInput = {
    create?: XOR<QuizAttemptCreateWithoutQuizInput, QuizAttemptUncheckedCreateWithoutQuizInput> | QuizAttemptCreateWithoutQuizInput[] | QuizAttemptUncheckedCreateWithoutQuizInput[]
    connectOrCreate?: QuizAttemptCreateOrConnectWithoutQuizInput | QuizAttemptCreateOrConnectWithoutQuizInput[]
    upsert?: QuizAttemptUpsertWithWhereUniqueWithoutQuizInput | QuizAttemptUpsertWithWhereUniqueWithoutQuizInput[]
    createMany?: QuizAttemptCreateManyQuizInputEnvelope
    set?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    disconnect?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    delete?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    connect?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    update?: QuizAttemptUpdateWithWhereUniqueWithoutQuizInput | QuizAttemptUpdateWithWhereUniqueWithoutQuizInput[]
    updateMany?: QuizAttemptUpdateManyWithWhereWithoutQuizInput | QuizAttemptUpdateManyWithWhereWithoutQuizInput[]
    deleteMany?: QuizAttemptScalarWhereInput | QuizAttemptScalarWhereInput[]
  }

  export type QuizQuestionUncheckedUpdateManyWithoutQuizNestedInput = {
    create?: XOR<QuizQuestionCreateWithoutQuizInput, QuizQuestionUncheckedCreateWithoutQuizInput> | QuizQuestionCreateWithoutQuizInput[] | QuizQuestionUncheckedCreateWithoutQuizInput[]
    connectOrCreate?: QuizQuestionCreateOrConnectWithoutQuizInput | QuizQuestionCreateOrConnectWithoutQuizInput[]
    upsert?: QuizQuestionUpsertWithWhereUniqueWithoutQuizInput | QuizQuestionUpsertWithWhereUniqueWithoutQuizInput[]
    createMany?: QuizQuestionCreateManyQuizInputEnvelope
    set?: QuizQuestionWhereUniqueInput | QuizQuestionWhereUniqueInput[]
    disconnect?: QuizQuestionWhereUniqueInput | QuizQuestionWhereUniqueInput[]
    delete?: QuizQuestionWhereUniqueInput | QuizQuestionWhereUniqueInput[]
    connect?: QuizQuestionWhereUniqueInput | QuizQuestionWhereUniqueInput[]
    update?: QuizQuestionUpdateWithWhereUniqueWithoutQuizInput | QuizQuestionUpdateWithWhereUniqueWithoutQuizInput[]
    updateMany?: QuizQuestionUpdateManyWithWhereWithoutQuizInput | QuizQuestionUpdateManyWithWhereWithoutQuizInput[]
    deleteMany?: QuizQuestionScalarWhereInput | QuizQuestionScalarWhereInput[]
  }

  export type QuizAttemptUncheckedUpdateManyWithoutQuizNestedInput = {
    create?: XOR<QuizAttemptCreateWithoutQuizInput, QuizAttemptUncheckedCreateWithoutQuizInput> | QuizAttemptCreateWithoutQuizInput[] | QuizAttemptUncheckedCreateWithoutQuizInput[]
    connectOrCreate?: QuizAttemptCreateOrConnectWithoutQuizInput | QuizAttemptCreateOrConnectWithoutQuizInput[]
    upsert?: QuizAttemptUpsertWithWhereUniqueWithoutQuizInput | QuizAttemptUpsertWithWhereUniqueWithoutQuizInput[]
    createMany?: QuizAttemptCreateManyQuizInputEnvelope
    set?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    disconnect?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    delete?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    connect?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    update?: QuizAttemptUpdateWithWhereUniqueWithoutQuizInput | QuizAttemptUpdateWithWhereUniqueWithoutQuizInput[]
    updateMany?: QuizAttemptUpdateManyWithWhereWithoutQuizInput | QuizAttemptUpdateManyWithWhereWithoutQuizInput[]
    deleteMany?: QuizAttemptScalarWhereInput | QuizAttemptScalarWhereInput[]
  }

  export type QuizQuestionCreateoptionsInput = {
    set: string[]
  }

  export type QuizCreateNestedOneWithoutQuestionsInput = {
    create?: XOR<QuizCreateWithoutQuestionsInput, QuizUncheckedCreateWithoutQuestionsInput>
    connectOrCreate?: QuizCreateOrConnectWithoutQuestionsInput
    connect?: QuizWhereUniqueInput
  }

  export type QuizQuestionUpdateoptionsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type QuizUpdateOneRequiredWithoutQuestionsNestedInput = {
    create?: XOR<QuizCreateWithoutQuestionsInput, QuizUncheckedCreateWithoutQuestionsInput>
    connectOrCreate?: QuizCreateOrConnectWithoutQuestionsInput
    upsert?: QuizUpsertWithoutQuestionsInput
    connect?: QuizWhereUniqueInput
    update?: XOR<XOR<QuizUpdateToOneWithWhereWithoutQuestionsInput, QuizUpdateWithoutQuestionsInput>, QuizUncheckedUpdateWithoutQuestionsInput>
  }

  export type QuizAttemptCreateanswersInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutQuizAttemptsInput = {
    create?: XOR<UserCreateWithoutQuizAttemptsInput, UserUncheckedCreateWithoutQuizAttemptsInput>
    connectOrCreate?: UserCreateOrConnectWithoutQuizAttemptsInput
    connect?: UserWhereUniqueInput
  }

  export type QuizCreateNestedOneWithoutAttemptsInput = {
    create?: XOR<QuizCreateWithoutAttemptsInput, QuizUncheckedCreateWithoutAttemptsInput>
    connectOrCreate?: QuizCreateOrConnectWithoutAttemptsInput
    connect?: QuizWhereUniqueInput
  }

  export type QuizAttemptUpdateanswersInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutQuizAttemptsNestedInput = {
    create?: XOR<UserCreateWithoutQuizAttemptsInput, UserUncheckedCreateWithoutQuizAttemptsInput>
    connectOrCreate?: UserCreateOrConnectWithoutQuizAttemptsInput
    upsert?: UserUpsertWithoutQuizAttemptsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutQuizAttemptsInput, UserUpdateWithoutQuizAttemptsInput>, UserUncheckedUpdateWithoutQuizAttemptsInput>
  }

  export type QuizUpdateOneRequiredWithoutAttemptsNestedInput = {
    create?: XOR<QuizCreateWithoutAttemptsInput, QuizUncheckedCreateWithoutAttemptsInput>
    connectOrCreate?: QuizCreateOrConnectWithoutAttemptsInput
    upsert?: QuizUpsertWithoutAttemptsInput
    connect?: QuizWhereUniqueInput
    update?: XOR<XOR<QuizUpdateToOneWithWhereWithoutAttemptsInput, QuizUpdateWithoutAttemptsInput>, QuizUncheckedUpdateWithoutAttemptsInput>
  }

  export type UserCreateNestedOneWithoutProgressesInput = {
    create?: XOR<UserCreateWithoutProgressesInput, UserUncheckedCreateWithoutProgressesInput>
    connectOrCreate?: UserCreateOrConnectWithoutProgressesInput
    connect?: UserWhereUniqueInput
  }

  export type CourseCreateNestedOneWithoutProgressesInput = {
    create?: XOR<CourseCreateWithoutProgressesInput, CourseUncheckedCreateWithoutProgressesInput>
    connectOrCreate?: CourseCreateOrConnectWithoutProgressesInput
    connect?: CourseWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutProgressesNestedInput = {
    create?: XOR<UserCreateWithoutProgressesInput, UserUncheckedCreateWithoutProgressesInput>
    connectOrCreate?: UserCreateOrConnectWithoutProgressesInput
    upsert?: UserUpsertWithoutProgressesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProgressesInput, UserUpdateWithoutProgressesInput>, UserUncheckedUpdateWithoutProgressesInput>
  }

  export type CourseUpdateOneRequiredWithoutProgressesNestedInput = {
    create?: XOR<CourseCreateWithoutProgressesInput, CourseUncheckedCreateWithoutProgressesInput>
    connectOrCreate?: CourseCreateOrConnectWithoutProgressesInput
    upsert?: CourseUpsertWithoutProgressesInput
    connect?: CourseWhereUniqueInput
    update?: XOR<XOR<CourseUpdateToOneWithWhereWithoutProgressesInput, CourseUpdateWithoutProgressesInput>, CourseUncheckedUpdateWithoutProgressesInput>
  }

  export type UserCreateNestedOneWithoutFeedbacksInput = {
    create?: XOR<UserCreateWithoutFeedbacksInput, UserUncheckedCreateWithoutFeedbacksInput>
    connectOrCreate?: UserCreateOrConnectWithoutFeedbacksInput
    connect?: UserWhereUniqueInput
  }

  export type CourseCreateNestedOneWithoutFeedbacksInput = {
    create?: XOR<CourseCreateWithoutFeedbacksInput, CourseUncheckedCreateWithoutFeedbacksInput>
    connectOrCreate?: CourseCreateOrConnectWithoutFeedbacksInput
    connect?: CourseWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutFeedbacksNestedInput = {
    create?: XOR<UserCreateWithoutFeedbacksInput, UserUncheckedCreateWithoutFeedbacksInput>
    connectOrCreate?: UserCreateOrConnectWithoutFeedbacksInput
    upsert?: UserUpsertWithoutFeedbacksInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFeedbacksInput, UserUpdateWithoutFeedbacksInput>, UserUncheckedUpdateWithoutFeedbacksInput>
  }

  export type CourseUpdateOneRequiredWithoutFeedbacksNestedInput = {
    create?: XOR<CourseCreateWithoutFeedbacksInput, CourseUncheckedCreateWithoutFeedbacksInput>
    connectOrCreate?: CourseCreateOrConnectWithoutFeedbacksInput
    upsert?: CourseUpsertWithoutFeedbacksInput
    connect?: CourseWhereUniqueInput
    update?: XOR<XOR<CourseUpdateToOneWithWhereWithoutFeedbacksInput, CourseUpdateWithoutFeedbacksInput>, CourseUncheckedUpdateWithoutFeedbacksInput>
  }

  export type CourseCreateNestedManyWithoutTeacherInput = {
    create?: XOR<CourseCreateWithoutTeacherInput, CourseUncheckedCreateWithoutTeacherInput> | CourseCreateWithoutTeacherInput[] | CourseUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutTeacherInput | CourseCreateOrConnectWithoutTeacherInput[]
    createMany?: CourseCreateManyTeacherInputEnvelope
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
  }

  export type FeedbackCreateNestedManyWithoutUserInput = {
    create?: XOR<FeedbackCreateWithoutUserInput, FeedbackUncheckedCreateWithoutUserInput> | FeedbackCreateWithoutUserInput[] | FeedbackUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutUserInput | FeedbackCreateOrConnectWithoutUserInput[]
    createMany?: FeedbackCreateManyUserInputEnvelope
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
  }

  export type EnrollmentCreateNestedManyWithoutStudentInput = {
    create?: XOR<EnrollmentCreateWithoutStudentInput, EnrollmentUncheckedCreateWithoutStudentInput> | EnrollmentCreateWithoutStudentInput[] | EnrollmentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutStudentInput | EnrollmentCreateOrConnectWithoutStudentInput[]
    createMany?: EnrollmentCreateManyStudentInputEnvelope
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
  }

  export type QuizAttemptCreateNestedManyWithoutStudentInput = {
    create?: XOR<QuizAttemptCreateWithoutStudentInput, QuizAttemptUncheckedCreateWithoutStudentInput> | QuizAttemptCreateWithoutStudentInput[] | QuizAttemptUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: QuizAttemptCreateOrConnectWithoutStudentInput | QuizAttemptCreateOrConnectWithoutStudentInput[]
    createMany?: QuizAttemptCreateManyStudentInputEnvelope
    connect?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
  }

  export type ProgressCreateNestedManyWithoutStudentInput = {
    create?: XOR<ProgressCreateWithoutStudentInput, ProgressUncheckedCreateWithoutStudentInput> | ProgressCreateWithoutStudentInput[] | ProgressUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ProgressCreateOrConnectWithoutStudentInput | ProgressCreateOrConnectWithoutStudentInput[]
    createMany?: ProgressCreateManyStudentInputEnvelope
    connect?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[]
  }

  export type CourseUncheckedCreateNestedManyWithoutTeacherInput = {
    create?: XOR<CourseCreateWithoutTeacherInput, CourseUncheckedCreateWithoutTeacherInput> | CourseCreateWithoutTeacherInput[] | CourseUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutTeacherInput | CourseCreateOrConnectWithoutTeacherInput[]
    createMany?: CourseCreateManyTeacherInputEnvelope
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
  }

  export type FeedbackUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FeedbackCreateWithoutUserInput, FeedbackUncheckedCreateWithoutUserInput> | FeedbackCreateWithoutUserInput[] | FeedbackUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutUserInput | FeedbackCreateOrConnectWithoutUserInput[]
    createMany?: FeedbackCreateManyUserInputEnvelope
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
  }

  export type EnrollmentUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<EnrollmentCreateWithoutStudentInput, EnrollmentUncheckedCreateWithoutStudentInput> | EnrollmentCreateWithoutStudentInput[] | EnrollmentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutStudentInput | EnrollmentCreateOrConnectWithoutStudentInput[]
    createMany?: EnrollmentCreateManyStudentInputEnvelope
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
  }

  export type QuizAttemptUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<QuizAttemptCreateWithoutStudentInput, QuizAttemptUncheckedCreateWithoutStudentInput> | QuizAttemptCreateWithoutStudentInput[] | QuizAttemptUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: QuizAttemptCreateOrConnectWithoutStudentInput | QuizAttemptCreateOrConnectWithoutStudentInput[]
    createMany?: QuizAttemptCreateManyStudentInputEnvelope
    connect?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
  }

  export type ProgressUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<ProgressCreateWithoutStudentInput, ProgressUncheckedCreateWithoutStudentInput> | ProgressCreateWithoutStudentInput[] | ProgressUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ProgressCreateOrConnectWithoutStudentInput | ProgressCreateOrConnectWithoutStudentInput[]
    createMany?: ProgressCreateManyStudentInputEnvelope
    connect?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[]
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type CourseUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<CourseCreateWithoutTeacherInput, CourseUncheckedCreateWithoutTeacherInput> | CourseCreateWithoutTeacherInput[] | CourseUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutTeacherInput | CourseCreateOrConnectWithoutTeacherInput[]
    upsert?: CourseUpsertWithWhereUniqueWithoutTeacherInput | CourseUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: CourseCreateManyTeacherInputEnvelope
    set?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    disconnect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    delete?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    update?: CourseUpdateWithWhereUniqueWithoutTeacherInput | CourseUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: CourseUpdateManyWithWhereWithoutTeacherInput | CourseUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: CourseScalarWhereInput | CourseScalarWhereInput[]
  }

  export type FeedbackUpdateManyWithoutUserNestedInput = {
    create?: XOR<FeedbackCreateWithoutUserInput, FeedbackUncheckedCreateWithoutUserInput> | FeedbackCreateWithoutUserInput[] | FeedbackUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutUserInput | FeedbackCreateOrConnectWithoutUserInput[]
    upsert?: FeedbackUpsertWithWhereUniqueWithoutUserInput | FeedbackUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FeedbackCreateManyUserInputEnvelope
    set?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    disconnect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    delete?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    update?: FeedbackUpdateWithWhereUniqueWithoutUserInput | FeedbackUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FeedbackUpdateManyWithWhereWithoutUserInput | FeedbackUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
  }

  export type EnrollmentUpdateManyWithoutStudentNestedInput = {
    create?: XOR<EnrollmentCreateWithoutStudentInput, EnrollmentUncheckedCreateWithoutStudentInput> | EnrollmentCreateWithoutStudentInput[] | EnrollmentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutStudentInput | EnrollmentCreateOrConnectWithoutStudentInput[]
    upsert?: EnrollmentUpsertWithWhereUniqueWithoutStudentInput | EnrollmentUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: EnrollmentCreateManyStudentInputEnvelope
    set?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    disconnect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    delete?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    update?: EnrollmentUpdateWithWhereUniqueWithoutStudentInput | EnrollmentUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: EnrollmentUpdateManyWithWhereWithoutStudentInput | EnrollmentUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
  }

  export type QuizAttemptUpdateManyWithoutStudentNestedInput = {
    create?: XOR<QuizAttemptCreateWithoutStudentInput, QuizAttemptUncheckedCreateWithoutStudentInput> | QuizAttemptCreateWithoutStudentInput[] | QuizAttemptUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: QuizAttemptCreateOrConnectWithoutStudentInput | QuizAttemptCreateOrConnectWithoutStudentInput[]
    upsert?: QuizAttemptUpsertWithWhereUniqueWithoutStudentInput | QuizAttemptUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: QuizAttemptCreateManyStudentInputEnvelope
    set?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    disconnect?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    delete?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    connect?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    update?: QuizAttemptUpdateWithWhereUniqueWithoutStudentInput | QuizAttemptUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: QuizAttemptUpdateManyWithWhereWithoutStudentInput | QuizAttemptUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: QuizAttemptScalarWhereInput | QuizAttemptScalarWhereInput[]
  }

  export type ProgressUpdateManyWithoutStudentNestedInput = {
    create?: XOR<ProgressCreateWithoutStudentInput, ProgressUncheckedCreateWithoutStudentInput> | ProgressCreateWithoutStudentInput[] | ProgressUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ProgressCreateOrConnectWithoutStudentInput | ProgressCreateOrConnectWithoutStudentInput[]
    upsert?: ProgressUpsertWithWhereUniqueWithoutStudentInput | ProgressUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: ProgressCreateManyStudentInputEnvelope
    set?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[]
    disconnect?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[]
    delete?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[]
    connect?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[]
    update?: ProgressUpdateWithWhereUniqueWithoutStudentInput | ProgressUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: ProgressUpdateManyWithWhereWithoutStudentInput | ProgressUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: ProgressScalarWhereInput | ProgressScalarWhereInput[]
  }

  export type CourseUncheckedUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<CourseCreateWithoutTeacherInput, CourseUncheckedCreateWithoutTeacherInput> | CourseCreateWithoutTeacherInput[] | CourseUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutTeacherInput | CourseCreateOrConnectWithoutTeacherInput[]
    upsert?: CourseUpsertWithWhereUniqueWithoutTeacherInput | CourseUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: CourseCreateManyTeacherInputEnvelope
    set?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    disconnect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    delete?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    update?: CourseUpdateWithWhereUniqueWithoutTeacherInput | CourseUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: CourseUpdateManyWithWhereWithoutTeacherInput | CourseUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: CourseScalarWhereInput | CourseScalarWhereInput[]
  }

  export type FeedbackUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FeedbackCreateWithoutUserInput, FeedbackUncheckedCreateWithoutUserInput> | FeedbackCreateWithoutUserInput[] | FeedbackUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutUserInput | FeedbackCreateOrConnectWithoutUserInput[]
    upsert?: FeedbackUpsertWithWhereUniqueWithoutUserInput | FeedbackUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FeedbackCreateManyUserInputEnvelope
    set?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    disconnect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    delete?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    update?: FeedbackUpdateWithWhereUniqueWithoutUserInput | FeedbackUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FeedbackUpdateManyWithWhereWithoutUserInput | FeedbackUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
  }

  export type EnrollmentUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<EnrollmentCreateWithoutStudentInput, EnrollmentUncheckedCreateWithoutStudentInput> | EnrollmentCreateWithoutStudentInput[] | EnrollmentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutStudentInput | EnrollmentCreateOrConnectWithoutStudentInput[]
    upsert?: EnrollmentUpsertWithWhereUniqueWithoutStudentInput | EnrollmentUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: EnrollmentCreateManyStudentInputEnvelope
    set?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    disconnect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    delete?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    update?: EnrollmentUpdateWithWhereUniqueWithoutStudentInput | EnrollmentUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: EnrollmentUpdateManyWithWhereWithoutStudentInput | EnrollmentUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
  }

  export type QuizAttemptUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<QuizAttemptCreateWithoutStudentInput, QuizAttemptUncheckedCreateWithoutStudentInput> | QuizAttemptCreateWithoutStudentInput[] | QuizAttemptUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: QuizAttemptCreateOrConnectWithoutStudentInput | QuizAttemptCreateOrConnectWithoutStudentInput[]
    upsert?: QuizAttemptUpsertWithWhereUniqueWithoutStudentInput | QuizAttemptUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: QuizAttemptCreateManyStudentInputEnvelope
    set?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    disconnect?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    delete?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    connect?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    update?: QuizAttemptUpdateWithWhereUniqueWithoutStudentInput | QuizAttemptUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: QuizAttemptUpdateManyWithWhereWithoutStudentInput | QuizAttemptUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: QuizAttemptScalarWhereInput | QuizAttemptScalarWhereInput[]
  }

  export type ProgressUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<ProgressCreateWithoutStudentInput, ProgressUncheckedCreateWithoutStudentInput> | ProgressCreateWithoutStudentInput[] | ProgressUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ProgressCreateOrConnectWithoutStudentInput | ProgressCreateOrConnectWithoutStudentInput[]
    upsert?: ProgressUpsertWithWhereUniqueWithoutStudentInput | ProgressUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: ProgressCreateManyStudentInputEnvelope
    set?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[]
    disconnect?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[]
    delete?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[]
    connect?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[]
    update?: ProgressUpdateWithWhereUniqueWithoutStudentInput | ProgressUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: ProgressUpdateManyWithWhereWithoutStudentInput | ProgressUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: ProgressScalarWhereInput | ProgressScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumContentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ContentType | EnumContentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ContentType[] | ListEnumContentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ContentType[] | ListEnumContentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumContentTypeFilter<$PrismaModel> | $Enums.ContentType
  }

  export type NestedEnumContentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ContentType | EnumContentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ContentType[] | ListEnumContentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ContentType[] | ListEnumContentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumContentTypeWithAggregatesFilter<$PrismaModel> | $Enums.ContentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumContentTypeFilter<$PrismaModel>
    _max?: NestedEnumContentTypeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedEnumQuizTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.QuizType | EnumQuizTypeFieldRefInput<$PrismaModel>
    in?: $Enums.QuizType[] | ListEnumQuizTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuizType[] | ListEnumQuizTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumQuizTypeFilter<$PrismaModel> | $Enums.QuizType
  }

  export type NestedEnumQuizTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuizType | EnumQuizTypeFieldRefInput<$PrismaModel>
    in?: $Enums.QuizType[] | ListEnumQuizTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuizType[] | ListEnumQuizTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumQuizTypeWithAggregatesFilter<$PrismaModel> | $Enums.QuizType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumQuizTypeFilter<$PrismaModel>
    _max?: NestedEnumQuizTypeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type UserCreateWithoutCoursesInput = {
    id?: string
    name: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    feedbacks?: FeedbackCreateNestedManyWithoutUserInput
    enrollments?: EnrollmentCreateNestedManyWithoutStudentInput
    quizAttempts?: QuizAttemptCreateNestedManyWithoutStudentInput
    progresses?: ProgressCreateNestedManyWithoutStudentInput
  }

  export type UserUncheckedCreateWithoutCoursesInput = {
    id?: string
    name: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutUserInput
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutStudentInput
    quizAttempts?: QuizAttemptUncheckedCreateNestedManyWithoutStudentInput
    progresses?: ProgressUncheckedCreateNestedManyWithoutStudentInput
  }

  export type UserCreateOrConnectWithoutCoursesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCoursesInput, UserUncheckedCreateWithoutCoursesInput>
  }

  export type CourseContentCreateWithoutCourseInput = {
    id?: string
    title: string
    type: $Enums.ContentType
    url: string
    orderIndex: number
  }

  export type CourseContentUncheckedCreateWithoutCourseInput = {
    id?: string
    title: string
    type: $Enums.ContentType
    url: string
    orderIndex: number
  }

  export type CourseContentCreateOrConnectWithoutCourseInput = {
    where: CourseContentWhereUniqueInput
    create: XOR<CourseContentCreateWithoutCourseInput, CourseContentUncheckedCreateWithoutCourseInput>
  }

  export type CourseContentCreateManyCourseInputEnvelope = {
    data: CourseContentCreateManyCourseInput | CourseContentCreateManyCourseInput[]
    skipDuplicates?: boolean
  }

  export type EnrollmentCreateWithoutCourseInput = {
    id?: string
    enrolledAt?: Date | string
    student: UserCreateNestedOneWithoutEnrollmentsInput
  }

  export type EnrollmentUncheckedCreateWithoutCourseInput = {
    id?: string
    studentId: string
    enrolledAt?: Date | string
  }

  export type EnrollmentCreateOrConnectWithoutCourseInput = {
    where: EnrollmentWhereUniqueInput
    create: XOR<EnrollmentCreateWithoutCourseInput, EnrollmentUncheckedCreateWithoutCourseInput>
  }

  export type EnrollmentCreateManyCourseInputEnvelope = {
    data: EnrollmentCreateManyCourseInput | EnrollmentCreateManyCourseInput[]
    skipDuplicates?: boolean
  }

  export type FeedbackCreateWithoutCourseInput = {
    id?: string
    rating: number
    comment: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFeedbacksInput
  }

  export type FeedbackUncheckedCreateWithoutCourseInput = {
    id?: string
    userId: string
    rating: number
    comment: string
    createdAt?: Date | string
  }

  export type FeedbackCreateOrConnectWithoutCourseInput = {
    where: FeedbackWhereUniqueInput
    create: XOR<FeedbackCreateWithoutCourseInput, FeedbackUncheckedCreateWithoutCourseInput>
  }

  export type FeedbackCreateManyCourseInputEnvelope = {
    data: FeedbackCreateManyCourseInput | FeedbackCreateManyCourseInput[]
    skipDuplicates?: boolean
  }

  export type QuizCreateWithoutCourseInput = {
    id?: string
    title: string
    type: $Enums.QuizType
    questions?: QuizQuestionCreateNestedManyWithoutQuizInput
    attempts?: QuizAttemptCreateNestedManyWithoutQuizInput
  }

  export type QuizUncheckedCreateWithoutCourseInput = {
    id?: string
    title: string
    type: $Enums.QuizType
    questions?: QuizQuestionUncheckedCreateNestedManyWithoutQuizInput
    attempts?: QuizAttemptUncheckedCreateNestedManyWithoutQuizInput
  }

  export type QuizCreateOrConnectWithoutCourseInput = {
    where: QuizWhereUniqueInput
    create: XOR<QuizCreateWithoutCourseInput, QuizUncheckedCreateWithoutCourseInput>
  }

  export type QuizCreateManyCourseInputEnvelope = {
    data: QuizCreateManyCourseInput | QuizCreateManyCourseInput[]
    skipDuplicates?: boolean
  }

  export type ProgressCreateWithoutCourseInput = {
    id?: string
    progressPercent: number
    completed: boolean
    student: UserCreateNestedOneWithoutProgressesInput
  }

  export type ProgressUncheckedCreateWithoutCourseInput = {
    id?: string
    studentId: string
    progressPercent: number
    completed: boolean
  }

  export type ProgressCreateOrConnectWithoutCourseInput = {
    where: ProgressWhereUniqueInput
    create: XOR<ProgressCreateWithoutCourseInput, ProgressUncheckedCreateWithoutCourseInput>
  }

  export type ProgressCreateManyCourseInputEnvelope = {
    data: ProgressCreateManyCourseInput | ProgressCreateManyCourseInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCoursesInput = {
    update: XOR<UserUpdateWithoutCoursesInput, UserUncheckedUpdateWithoutCoursesInput>
    create: XOR<UserCreateWithoutCoursesInput, UserUncheckedCreateWithoutCoursesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCoursesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCoursesInput, UserUncheckedUpdateWithoutCoursesInput>
  }

  export type UserUpdateWithoutCoursesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    feedbacks?: FeedbackUpdateManyWithoutUserNestedInput
    enrollments?: EnrollmentUpdateManyWithoutStudentNestedInput
    quizAttempts?: QuizAttemptUpdateManyWithoutStudentNestedInput
    progresses?: ProgressUpdateManyWithoutStudentNestedInput
  }

  export type UserUncheckedUpdateWithoutCoursesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    feedbacks?: FeedbackUncheckedUpdateManyWithoutUserNestedInput
    enrollments?: EnrollmentUncheckedUpdateManyWithoutStudentNestedInput
    quizAttempts?: QuizAttemptUncheckedUpdateManyWithoutStudentNestedInput
    progresses?: ProgressUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type CourseContentUpsertWithWhereUniqueWithoutCourseInput = {
    where: CourseContentWhereUniqueInput
    update: XOR<CourseContentUpdateWithoutCourseInput, CourseContentUncheckedUpdateWithoutCourseInput>
    create: XOR<CourseContentCreateWithoutCourseInput, CourseContentUncheckedCreateWithoutCourseInput>
  }

  export type CourseContentUpdateWithWhereUniqueWithoutCourseInput = {
    where: CourseContentWhereUniqueInput
    data: XOR<CourseContentUpdateWithoutCourseInput, CourseContentUncheckedUpdateWithoutCourseInput>
  }

  export type CourseContentUpdateManyWithWhereWithoutCourseInput = {
    where: CourseContentScalarWhereInput
    data: XOR<CourseContentUpdateManyMutationInput, CourseContentUncheckedUpdateManyWithoutCourseInput>
  }

  export type CourseContentScalarWhereInput = {
    AND?: CourseContentScalarWhereInput | CourseContentScalarWhereInput[]
    OR?: CourseContentScalarWhereInput[]
    NOT?: CourseContentScalarWhereInput | CourseContentScalarWhereInput[]
    id?: StringFilter<"CourseContent"> | string
    title?: StringFilter<"CourseContent"> | string
    type?: EnumContentTypeFilter<"CourseContent"> | $Enums.ContentType
    url?: StringFilter<"CourseContent"> | string
    courseId?: StringFilter<"CourseContent"> | string
    orderIndex?: IntFilter<"CourseContent"> | number
  }

  export type EnrollmentUpsertWithWhereUniqueWithoutCourseInput = {
    where: EnrollmentWhereUniqueInput
    update: XOR<EnrollmentUpdateWithoutCourseInput, EnrollmentUncheckedUpdateWithoutCourseInput>
    create: XOR<EnrollmentCreateWithoutCourseInput, EnrollmentUncheckedCreateWithoutCourseInput>
  }

  export type EnrollmentUpdateWithWhereUniqueWithoutCourseInput = {
    where: EnrollmentWhereUniqueInput
    data: XOR<EnrollmentUpdateWithoutCourseInput, EnrollmentUncheckedUpdateWithoutCourseInput>
  }

  export type EnrollmentUpdateManyWithWhereWithoutCourseInput = {
    where: EnrollmentScalarWhereInput
    data: XOR<EnrollmentUpdateManyMutationInput, EnrollmentUncheckedUpdateManyWithoutCourseInput>
  }

  export type EnrollmentScalarWhereInput = {
    AND?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
    OR?: EnrollmentScalarWhereInput[]
    NOT?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
    id?: StringFilter<"Enrollment"> | string
    studentId?: StringFilter<"Enrollment"> | string
    courseId?: StringFilter<"Enrollment"> | string
    enrolledAt?: DateTimeFilter<"Enrollment"> | Date | string
  }

  export type FeedbackUpsertWithWhereUniqueWithoutCourseInput = {
    where: FeedbackWhereUniqueInput
    update: XOR<FeedbackUpdateWithoutCourseInput, FeedbackUncheckedUpdateWithoutCourseInput>
    create: XOR<FeedbackCreateWithoutCourseInput, FeedbackUncheckedCreateWithoutCourseInput>
  }

  export type FeedbackUpdateWithWhereUniqueWithoutCourseInput = {
    where: FeedbackWhereUniqueInput
    data: XOR<FeedbackUpdateWithoutCourseInput, FeedbackUncheckedUpdateWithoutCourseInput>
  }

  export type FeedbackUpdateManyWithWhereWithoutCourseInput = {
    where: FeedbackScalarWhereInput
    data: XOR<FeedbackUpdateManyMutationInput, FeedbackUncheckedUpdateManyWithoutCourseInput>
  }

  export type FeedbackScalarWhereInput = {
    AND?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
    OR?: FeedbackScalarWhereInput[]
    NOT?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
    id?: StringFilter<"Feedback"> | string
    userId?: StringFilter<"Feedback"> | string
    courseId?: StringFilter<"Feedback"> | string
    rating?: IntFilter<"Feedback"> | number
    comment?: StringFilter<"Feedback"> | string
    createdAt?: DateTimeFilter<"Feedback"> | Date | string
  }

  export type QuizUpsertWithWhereUniqueWithoutCourseInput = {
    where: QuizWhereUniqueInput
    update: XOR<QuizUpdateWithoutCourseInput, QuizUncheckedUpdateWithoutCourseInput>
    create: XOR<QuizCreateWithoutCourseInput, QuizUncheckedCreateWithoutCourseInput>
  }

  export type QuizUpdateWithWhereUniqueWithoutCourseInput = {
    where: QuizWhereUniqueInput
    data: XOR<QuizUpdateWithoutCourseInput, QuizUncheckedUpdateWithoutCourseInput>
  }

  export type QuizUpdateManyWithWhereWithoutCourseInput = {
    where: QuizScalarWhereInput
    data: XOR<QuizUpdateManyMutationInput, QuizUncheckedUpdateManyWithoutCourseInput>
  }

  export type QuizScalarWhereInput = {
    AND?: QuizScalarWhereInput | QuizScalarWhereInput[]
    OR?: QuizScalarWhereInput[]
    NOT?: QuizScalarWhereInput | QuizScalarWhereInput[]
    id?: StringFilter<"Quiz"> | string
    title?: StringFilter<"Quiz"> | string
    type?: EnumQuizTypeFilter<"Quiz"> | $Enums.QuizType
    courseId?: StringFilter<"Quiz"> | string
  }

  export type ProgressUpsertWithWhereUniqueWithoutCourseInput = {
    where: ProgressWhereUniqueInput
    update: XOR<ProgressUpdateWithoutCourseInput, ProgressUncheckedUpdateWithoutCourseInput>
    create: XOR<ProgressCreateWithoutCourseInput, ProgressUncheckedCreateWithoutCourseInput>
  }

  export type ProgressUpdateWithWhereUniqueWithoutCourseInput = {
    where: ProgressWhereUniqueInput
    data: XOR<ProgressUpdateWithoutCourseInput, ProgressUncheckedUpdateWithoutCourseInput>
  }

  export type ProgressUpdateManyWithWhereWithoutCourseInput = {
    where: ProgressScalarWhereInput
    data: XOR<ProgressUpdateManyMutationInput, ProgressUncheckedUpdateManyWithoutCourseInput>
  }

  export type ProgressScalarWhereInput = {
    AND?: ProgressScalarWhereInput | ProgressScalarWhereInput[]
    OR?: ProgressScalarWhereInput[]
    NOT?: ProgressScalarWhereInput | ProgressScalarWhereInput[]
    id?: StringFilter<"Progress"> | string
    studentId?: StringFilter<"Progress"> | string
    courseId?: StringFilter<"Progress"> | string
    progressPercent?: FloatFilter<"Progress"> | number
    completed?: BoolFilter<"Progress"> | boolean
  }

  export type CourseCreateWithoutContentsInput = {
    id?: string
    title: string
    description: string
    thumbnail: string
    price: number
    createdAt?: Date | string
    teacher: UserCreateNestedOneWithoutCoursesInput
    enrollments?: EnrollmentCreateNestedManyWithoutCourseInput
    feedbacks?: FeedbackCreateNestedManyWithoutCourseInput
    quizzes?: QuizCreateNestedManyWithoutCourseInput
    progresses?: ProgressCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutContentsInput = {
    id?: string
    title: string
    description: string
    thumbnail: string
    price: number
    teacherId: string
    createdAt?: Date | string
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutCourseInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutCourseInput
    quizzes?: QuizUncheckedCreateNestedManyWithoutCourseInput
    progresses?: ProgressUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutContentsInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutContentsInput, CourseUncheckedCreateWithoutContentsInput>
  }

  export type CourseUpsertWithoutContentsInput = {
    update: XOR<CourseUpdateWithoutContentsInput, CourseUncheckedUpdateWithoutContentsInput>
    create: XOR<CourseCreateWithoutContentsInput, CourseUncheckedCreateWithoutContentsInput>
    where?: CourseWhereInput
  }

  export type CourseUpdateToOneWithWhereWithoutContentsInput = {
    where?: CourseWhereInput
    data: XOR<CourseUpdateWithoutContentsInput, CourseUncheckedUpdateWithoutContentsInput>
  }

  export type CourseUpdateWithoutContentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnail?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacher?: UserUpdateOneRequiredWithoutCoursesNestedInput
    enrollments?: EnrollmentUpdateManyWithoutCourseNestedInput
    feedbacks?: FeedbackUpdateManyWithoutCourseNestedInput
    quizzes?: QuizUpdateManyWithoutCourseNestedInput
    progresses?: ProgressUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateWithoutContentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnail?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    teacherId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    enrollments?: EnrollmentUncheckedUpdateManyWithoutCourseNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutCourseNestedInput
    quizzes?: QuizUncheckedUpdateManyWithoutCourseNestedInput
    progresses?: ProgressUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type UserCreateWithoutEnrollmentsInput = {
    id?: string
    name: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    courses?: CourseCreateNestedManyWithoutTeacherInput
    feedbacks?: FeedbackCreateNestedManyWithoutUserInput
    quizAttempts?: QuizAttemptCreateNestedManyWithoutStudentInput
    progresses?: ProgressCreateNestedManyWithoutStudentInput
  }

  export type UserUncheckedCreateWithoutEnrollmentsInput = {
    id?: string
    name: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    courses?: CourseUncheckedCreateNestedManyWithoutTeacherInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutUserInput
    quizAttempts?: QuizAttemptUncheckedCreateNestedManyWithoutStudentInput
    progresses?: ProgressUncheckedCreateNestedManyWithoutStudentInput
  }

  export type UserCreateOrConnectWithoutEnrollmentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEnrollmentsInput, UserUncheckedCreateWithoutEnrollmentsInput>
  }

  export type CourseCreateWithoutEnrollmentsInput = {
    id?: string
    title: string
    description: string
    thumbnail: string
    price: number
    createdAt?: Date | string
    teacher: UserCreateNestedOneWithoutCoursesInput
    contents?: CourseContentCreateNestedManyWithoutCourseInput
    feedbacks?: FeedbackCreateNestedManyWithoutCourseInput
    quizzes?: QuizCreateNestedManyWithoutCourseInput
    progresses?: ProgressCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutEnrollmentsInput = {
    id?: string
    title: string
    description: string
    thumbnail: string
    price: number
    teacherId: string
    createdAt?: Date | string
    contents?: CourseContentUncheckedCreateNestedManyWithoutCourseInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutCourseInput
    quizzes?: QuizUncheckedCreateNestedManyWithoutCourseInput
    progresses?: ProgressUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutEnrollmentsInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutEnrollmentsInput, CourseUncheckedCreateWithoutEnrollmentsInput>
  }

  export type UserUpsertWithoutEnrollmentsInput = {
    update: XOR<UserUpdateWithoutEnrollmentsInput, UserUncheckedUpdateWithoutEnrollmentsInput>
    create: XOR<UserCreateWithoutEnrollmentsInput, UserUncheckedCreateWithoutEnrollmentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEnrollmentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEnrollmentsInput, UserUncheckedUpdateWithoutEnrollmentsInput>
  }

  export type UserUpdateWithoutEnrollmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    courses?: CourseUpdateManyWithoutTeacherNestedInput
    feedbacks?: FeedbackUpdateManyWithoutUserNestedInput
    quizAttempts?: QuizAttemptUpdateManyWithoutStudentNestedInput
    progresses?: ProgressUpdateManyWithoutStudentNestedInput
  }

  export type UserUncheckedUpdateWithoutEnrollmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    courses?: CourseUncheckedUpdateManyWithoutTeacherNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutUserNestedInput
    quizAttempts?: QuizAttemptUncheckedUpdateManyWithoutStudentNestedInput
    progresses?: ProgressUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type CourseUpsertWithoutEnrollmentsInput = {
    update: XOR<CourseUpdateWithoutEnrollmentsInput, CourseUncheckedUpdateWithoutEnrollmentsInput>
    create: XOR<CourseCreateWithoutEnrollmentsInput, CourseUncheckedCreateWithoutEnrollmentsInput>
    where?: CourseWhereInput
  }

  export type CourseUpdateToOneWithWhereWithoutEnrollmentsInput = {
    where?: CourseWhereInput
    data: XOR<CourseUpdateWithoutEnrollmentsInput, CourseUncheckedUpdateWithoutEnrollmentsInput>
  }

  export type CourseUpdateWithoutEnrollmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnail?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacher?: UserUpdateOneRequiredWithoutCoursesNestedInput
    contents?: CourseContentUpdateManyWithoutCourseNestedInput
    feedbacks?: FeedbackUpdateManyWithoutCourseNestedInput
    quizzes?: QuizUpdateManyWithoutCourseNestedInput
    progresses?: ProgressUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateWithoutEnrollmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnail?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    teacherId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contents?: CourseContentUncheckedUpdateManyWithoutCourseNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutCourseNestedInput
    quizzes?: QuizUncheckedUpdateManyWithoutCourseNestedInput
    progresses?: ProgressUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type CourseCreateWithoutQuizzesInput = {
    id?: string
    title: string
    description: string
    thumbnail: string
    price: number
    createdAt?: Date | string
    teacher: UserCreateNestedOneWithoutCoursesInput
    contents?: CourseContentCreateNestedManyWithoutCourseInput
    enrollments?: EnrollmentCreateNestedManyWithoutCourseInput
    feedbacks?: FeedbackCreateNestedManyWithoutCourseInput
    progresses?: ProgressCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutQuizzesInput = {
    id?: string
    title: string
    description: string
    thumbnail: string
    price: number
    teacherId: string
    createdAt?: Date | string
    contents?: CourseContentUncheckedCreateNestedManyWithoutCourseInput
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutCourseInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutCourseInput
    progresses?: ProgressUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutQuizzesInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutQuizzesInput, CourseUncheckedCreateWithoutQuizzesInput>
  }

  export type QuizQuestionCreateWithoutQuizInput = {
    id?: string
    questionText: string
    options?: QuizQuestionCreateoptionsInput | string[]
    correctAnswer: string
  }

  export type QuizQuestionUncheckedCreateWithoutQuizInput = {
    id?: string
    questionText: string
    options?: QuizQuestionCreateoptionsInput | string[]
    correctAnswer: string
  }

  export type QuizQuestionCreateOrConnectWithoutQuizInput = {
    where: QuizQuestionWhereUniqueInput
    create: XOR<QuizQuestionCreateWithoutQuizInput, QuizQuestionUncheckedCreateWithoutQuizInput>
  }

  export type QuizQuestionCreateManyQuizInputEnvelope = {
    data: QuizQuestionCreateManyQuizInput | QuizQuestionCreateManyQuizInput[]
    skipDuplicates?: boolean
  }

  export type QuizAttemptCreateWithoutQuizInput = {
    id?: string
    score: number
    answers?: QuizAttemptCreateanswersInput | string[]
    submittedAt?: Date | string
    student: UserCreateNestedOneWithoutQuizAttemptsInput
  }

  export type QuizAttemptUncheckedCreateWithoutQuizInput = {
    id?: string
    studentId: string
    score: number
    answers?: QuizAttemptCreateanswersInput | string[]
    submittedAt?: Date | string
  }

  export type QuizAttemptCreateOrConnectWithoutQuizInput = {
    where: QuizAttemptWhereUniqueInput
    create: XOR<QuizAttemptCreateWithoutQuizInput, QuizAttemptUncheckedCreateWithoutQuizInput>
  }

  export type QuizAttemptCreateManyQuizInputEnvelope = {
    data: QuizAttemptCreateManyQuizInput | QuizAttemptCreateManyQuizInput[]
    skipDuplicates?: boolean
  }

  export type CourseUpsertWithoutQuizzesInput = {
    update: XOR<CourseUpdateWithoutQuizzesInput, CourseUncheckedUpdateWithoutQuizzesInput>
    create: XOR<CourseCreateWithoutQuizzesInput, CourseUncheckedCreateWithoutQuizzesInput>
    where?: CourseWhereInput
  }

  export type CourseUpdateToOneWithWhereWithoutQuizzesInput = {
    where?: CourseWhereInput
    data: XOR<CourseUpdateWithoutQuizzesInput, CourseUncheckedUpdateWithoutQuizzesInput>
  }

  export type CourseUpdateWithoutQuizzesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnail?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacher?: UserUpdateOneRequiredWithoutCoursesNestedInput
    contents?: CourseContentUpdateManyWithoutCourseNestedInput
    enrollments?: EnrollmentUpdateManyWithoutCourseNestedInput
    feedbacks?: FeedbackUpdateManyWithoutCourseNestedInput
    progresses?: ProgressUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateWithoutQuizzesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnail?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    teacherId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contents?: CourseContentUncheckedUpdateManyWithoutCourseNestedInput
    enrollments?: EnrollmentUncheckedUpdateManyWithoutCourseNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutCourseNestedInput
    progresses?: ProgressUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type QuizQuestionUpsertWithWhereUniqueWithoutQuizInput = {
    where: QuizQuestionWhereUniqueInput
    update: XOR<QuizQuestionUpdateWithoutQuizInput, QuizQuestionUncheckedUpdateWithoutQuizInput>
    create: XOR<QuizQuestionCreateWithoutQuizInput, QuizQuestionUncheckedCreateWithoutQuizInput>
  }

  export type QuizQuestionUpdateWithWhereUniqueWithoutQuizInput = {
    where: QuizQuestionWhereUniqueInput
    data: XOR<QuizQuestionUpdateWithoutQuizInput, QuizQuestionUncheckedUpdateWithoutQuizInput>
  }

  export type QuizQuestionUpdateManyWithWhereWithoutQuizInput = {
    where: QuizQuestionScalarWhereInput
    data: XOR<QuizQuestionUpdateManyMutationInput, QuizQuestionUncheckedUpdateManyWithoutQuizInput>
  }

  export type QuizQuestionScalarWhereInput = {
    AND?: QuizQuestionScalarWhereInput | QuizQuestionScalarWhereInput[]
    OR?: QuizQuestionScalarWhereInput[]
    NOT?: QuizQuestionScalarWhereInput | QuizQuestionScalarWhereInput[]
    id?: StringFilter<"QuizQuestion"> | string
    quizId?: StringFilter<"QuizQuestion"> | string
    questionText?: StringFilter<"QuizQuestion"> | string
    options?: StringNullableListFilter<"QuizQuestion">
    correctAnswer?: StringFilter<"QuizQuestion"> | string
  }

  export type QuizAttemptUpsertWithWhereUniqueWithoutQuizInput = {
    where: QuizAttemptWhereUniqueInput
    update: XOR<QuizAttemptUpdateWithoutQuizInput, QuizAttemptUncheckedUpdateWithoutQuizInput>
    create: XOR<QuizAttemptCreateWithoutQuizInput, QuizAttemptUncheckedCreateWithoutQuizInput>
  }

  export type QuizAttemptUpdateWithWhereUniqueWithoutQuizInput = {
    where: QuizAttemptWhereUniqueInput
    data: XOR<QuizAttemptUpdateWithoutQuizInput, QuizAttemptUncheckedUpdateWithoutQuizInput>
  }

  export type QuizAttemptUpdateManyWithWhereWithoutQuizInput = {
    where: QuizAttemptScalarWhereInput
    data: XOR<QuizAttemptUpdateManyMutationInput, QuizAttemptUncheckedUpdateManyWithoutQuizInput>
  }

  export type QuizAttemptScalarWhereInput = {
    AND?: QuizAttemptScalarWhereInput | QuizAttemptScalarWhereInput[]
    OR?: QuizAttemptScalarWhereInput[]
    NOT?: QuizAttemptScalarWhereInput | QuizAttemptScalarWhereInput[]
    id?: StringFilter<"QuizAttempt"> | string
    studentId?: StringFilter<"QuizAttempt"> | string
    quizId?: StringFilter<"QuizAttempt"> | string
    score?: FloatFilter<"QuizAttempt"> | number
    answers?: StringNullableListFilter<"QuizAttempt">
    submittedAt?: DateTimeFilter<"QuizAttempt"> | Date | string
  }

  export type QuizCreateWithoutQuestionsInput = {
    id?: string
    title: string
    type: $Enums.QuizType
    course: CourseCreateNestedOneWithoutQuizzesInput
    attempts?: QuizAttemptCreateNestedManyWithoutQuizInput
  }

  export type QuizUncheckedCreateWithoutQuestionsInput = {
    id?: string
    title: string
    type: $Enums.QuizType
    courseId: string
    attempts?: QuizAttemptUncheckedCreateNestedManyWithoutQuizInput
  }

  export type QuizCreateOrConnectWithoutQuestionsInput = {
    where: QuizWhereUniqueInput
    create: XOR<QuizCreateWithoutQuestionsInput, QuizUncheckedCreateWithoutQuestionsInput>
  }

  export type QuizUpsertWithoutQuestionsInput = {
    update: XOR<QuizUpdateWithoutQuestionsInput, QuizUncheckedUpdateWithoutQuestionsInput>
    create: XOR<QuizCreateWithoutQuestionsInput, QuizUncheckedCreateWithoutQuestionsInput>
    where?: QuizWhereInput
  }

  export type QuizUpdateToOneWithWhereWithoutQuestionsInput = {
    where?: QuizWhereInput
    data: XOR<QuizUpdateWithoutQuestionsInput, QuizUncheckedUpdateWithoutQuestionsInput>
  }

  export type QuizUpdateWithoutQuestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: EnumQuizTypeFieldUpdateOperationsInput | $Enums.QuizType
    course?: CourseUpdateOneRequiredWithoutQuizzesNestedInput
    attempts?: QuizAttemptUpdateManyWithoutQuizNestedInput
  }

  export type QuizUncheckedUpdateWithoutQuestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: EnumQuizTypeFieldUpdateOperationsInput | $Enums.QuizType
    courseId?: StringFieldUpdateOperationsInput | string
    attempts?: QuizAttemptUncheckedUpdateManyWithoutQuizNestedInput
  }

  export type UserCreateWithoutQuizAttemptsInput = {
    id?: string
    name: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    courses?: CourseCreateNestedManyWithoutTeacherInput
    feedbacks?: FeedbackCreateNestedManyWithoutUserInput
    enrollments?: EnrollmentCreateNestedManyWithoutStudentInput
    progresses?: ProgressCreateNestedManyWithoutStudentInput
  }

  export type UserUncheckedCreateWithoutQuizAttemptsInput = {
    id?: string
    name: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    courses?: CourseUncheckedCreateNestedManyWithoutTeacherInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutUserInput
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutStudentInput
    progresses?: ProgressUncheckedCreateNestedManyWithoutStudentInput
  }

  export type UserCreateOrConnectWithoutQuizAttemptsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutQuizAttemptsInput, UserUncheckedCreateWithoutQuizAttemptsInput>
  }

  export type QuizCreateWithoutAttemptsInput = {
    id?: string
    title: string
    type: $Enums.QuizType
    course: CourseCreateNestedOneWithoutQuizzesInput
    questions?: QuizQuestionCreateNestedManyWithoutQuizInput
  }

  export type QuizUncheckedCreateWithoutAttemptsInput = {
    id?: string
    title: string
    type: $Enums.QuizType
    courseId: string
    questions?: QuizQuestionUncheckedCreateNestedManyWithoutQuizInput
  }

  export type QuizCreateOrConnectWithoutAttemptsInput = {
    where: QuizWhereUniqueInput
    create: XOR<QuizCreateWithoutAttemptsInput, QuizUncheckedCreateWithoutAttemptsInput>
  }

  export type UserUpsertWithoutQuizAttemptsInput = {
    update: XOR<UserUpdateWithoutQuizAttemptsInput, UserUncheckedUpdateWithoutQuizAttemptsInput>
    create: XOR<UserCreateWithoutQuizAttemptsInput, UserUncheckedCreateWithoutQuizAttemptsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutQuizAttemptsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutQuizAttemptsInput, UserUncheckedUpdateWithoutQuizAttemptsInput>
  }

  export type UserUpdateWithoutQuizAttemptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    courses?: CourseUpdateManyWithoutTeacherNestedInput
    feedbacks?: FeedbackUpdateManyWithoutUserNestedInput
    enrollments?: EnrollmentUpdateManyWithoutStudentNestedInput
    progresses?: ProgressUpdateManyWithoutStudentNestedInput
  }

  export type UserUncheckedUpdateWithoutQuizAttemptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    courses?: CourseUncheckedUpdateManyWithoutTeacherNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutUserNestedInput
    enrollments?: EnrollmentUncheckedUpdateManyWithoutStudentNestedInput
    progresses?: ProgressUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type QuizUpsertWithoutAttemptsInput = {
    update: XOR<QuizUpdateWithoutAttemptsInput, QuizUncheckedUpdateWithoutAttemptsInput>
    create: XOR<QuizCreateWithoutAttemptsInput, QuizUncheckedCreateWithoutAttemptsInput>
    where?: QuizWhereInput
  }

  export type QuizUpdateToOneWithWhereWithoutAttemptsInput = {
    where?: QuizWhereInput
    data: XOR<QuizUpdateWithoutAttemptsInput, QuizUncheckedUpdateWithoutAttemptsInput>
  }

  export type QuizUpdateWithoutAttemptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: EnumQuizTypeFieldUpdateOperationsInput | $Enums.QuizType
    course?: CourseUpdateOneRequiredWithoutQuizzesNestedInput
    questions?: QuizQuestionUpdateManyWithoutQuizNestedInput
  }

  export type QuizUncheckedUpdateWithoutAttemptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: EnumQuizTypeFieldUpdateOperationsInput | $Enums.QuizType
    courseId?: StringFieldUpdateOperationsInput | string
    questions?: QuizQuestionUncheckedUpdateManyWithoutQuizNestedInput
  }

  export type UserCreateWithoutProgressesInput = {
    id?: string
    name: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    courses?: CourseCreateNestedManyWithoutTeacherInput
    feedbacks?: FeedbackCreateNestedManyWithoutUserInput
    enrollments?: EnrollmentCreateNestedManyWithoutStudentInput
    quizAttempts?: QuizAttemptCreateNestedManyWithoutStudentInput
  }

  export type UserUncheckedCreateWithoutProgressesInput = {
    id?: string
    name: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    courses?: CourseUncheckedCreateNestedManyWithoutTeacherInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutUserInput
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutStudentInput
    quizAttempts?: QuizAttemptUncheckedCreateNestedManyWithoutStudentInput
  }

  export type UserCreateOrConnectWithoutProgressesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProgressesInput, UserUncheckedCreateWithoutProgressesInput>
  }

  export type CourseCreateWithoutProgressesInput = {
    id?: string
    title: string
    description: string
    thumbnail: string
    price: number
    createdAt?: Date | string
    teacher: UserCreateNestedOneWithoutCoursesInput
    contents?: CourseContentCreateNestedManyWithoutCourseInput
    enrollments?: EnrollmentCreateNestedManyWithoutCourseInput
    feedbacks?: FeedbackCreateNestedManyWithoutCourseInput
    quizzes?: QuizCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutProgressesInput = {
    id?: string
    title: string
    description: string
    thumbnail: string
    price: number
    teacherId: string
    createdAt?: Date | string
    contents?: CourseContentUncheckedCreateNestedManyWithoutCourseInput
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutCourseInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutCourseInput
    quizzes?: QuizUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutProgressesInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutProgressesInput, CourseUncheckedCreateWithoutProgressesInput>
  }

  export type UserUpsertWithoutProgressesInput = {
    update: XOR<UserUpdateWithoutProgressesInput, UserUncheckedUpdateWithoutProgressesInput>
    create: XOR<UserCreateWithoutProgressesInput, UserUncheckedCreateWithoutProgressesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProgressesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProgressesInput, UserUncheckedUpdateWithoutProgressesInput>
  }

  export type UserUpdateWithoutProgressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    courses?: CourseUpdateManyWithoutTeacherNestedInput
    feedbacks?: FeedbackUpdateManyWithoutUserNestedInput
    enrollments?: EnrollmentUpdateManyWithoutStudentNestedInput
    quizAttempts?: QuizAttemptUpdateManyWithoutStudentNestedInput
  }

  export type UserUncheckedUpdateWithoutProgressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    courses?: CourseUncheckedUpdateManyWithoutTeacherNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutUserNestedInput
    enrollments?: EnrollmentUncheckedUpdateManyWithoutStudentNestedInput
    quizAttempts?: QuizAttemptUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type CourseUpsertWithoutProgressesInput = {
    update: XOR<CourseUpdateWithoutProgressesInput, CourseUncheckedUpdateWithoutProgressesInput>
    create: XOR<CourseCreateWithoutProgressesInput, CourseUncheckedCreateWithoutProgressesInput>
    where?: CourseWhereInput
  }

  export type CourseUpdateToOneWithWhereWithoutProgressesInput = {
    where?: CourseWhereInput
    data: XOR<CourseUpdateWithoutProgressesInput, CourseUncheckedUpdateWithoutProgressesInput>
  }

  export type CourseUpdateWithoutProgressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnail?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacher?: UserUpdateOneRequiredWithoutCoursesNestedInput
    contents?: CourseContentUpdateManyWithoutCourseNestedInput
    enrollments?: EnrollmentUpdateManyWithoutCourseNestedInput
    feedbacks?: FeedbackUpdateManyWithoutCourseNestedInput
    quizzes?: QuizUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateWithoutProgressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnail?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    teacherId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contents?: CourseContentUncheckedUpdateManyWithoutCourseNestedInput
    enrollments?: EnrollmentUncheckedUpdateManyWithoutCourseNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutCourseNestedInput
    quizzes?: QuizUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type UserCreateWithoutFeedbacksInput = {
    id?: string
    name: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    courses?: CourseCreateNestedManyWithoutTeacherInput
    enrollments?: EnrollmentCreateNestedManyWithoutStudentInput
    quizAttempts?: QuizAttemptCreateNestedManyWithoutStudentInput
    progresses?: ProgressCreateNestedManyWithoutStudentInput
  }

  export type UserUncheckedCreateWithoutFeedbacksInput = {
    id?: string
    name: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    courses?: CourseUncheckedCreateNestedManyWithoutTeacherInput
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutStudentInput
    quizAttempts?: QuizAttemptUncheckedCreateNestedManyWithoutStudentInput
    progresses?: ProgressUncheckedCreateNestedManyWithoutStudentInput
  }

  export type UserCreateOrConnectWithoutFeedbacksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFeedbacksInput, UserUncheckedCreateWithoutFeedbacksInput>
  }

  export type CourseCreateWithoutFeedbacksInput = {
    id?: string
    title: string
    description: string
    thumbnail: string
    price: number
    createdAt?: Date | string
    teacher: UserCreateNestedOneWithoutCoursesInput
    contents?: CourseContentCreateNestedManyWithoutCourseInput
    enrollments?: EnrollmentCreateNestedManyWithoutCourseInput
    quizzes?: QuizCreateNestedManyWithoutCourseInput
    progresses?: ProgressCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutFeedbacksInput = {
    id?: string
    title: string
    description: string
    thumbnail: string
    price: number
    teacherId: string
    createdAt?: Date | string
    contents?: CourseContentUncheckedCreateNestedManyWithoutCourseInput
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutCourseInput
    quizzes?: QuizUncheckedCreateNestedManyWithoutCourseInput
    progresses?: ProgressUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutFeedbacksInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutFeedbacksInput, CourseUncheckedCreateWithoutFeedbacksInput>
  }

  export type UserUpsertWithoutFeedbacksInput = {
    update: XOR<UserUpdateWithoutFeedbacksInput, UserUncheckedUpdateWithoutFeedbacksInput>
    create: XOR<UserCreateWithoutFeedbacksInput, UserUncheckedCreateWithoutFeedbacksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFeedbacksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFeedbacksInput, UserUncheckedUpdateWithoutFeedbacksInput>
  }

  export type UserUpdateWithoutFeedbacksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    courses?: CourseUpdateManyWithoutTeacherNestedInput
    enrollments?: EnrollmentUpdateManyWithoutStudentNestedInput
    quizAttempts?: QuizAttemptUpdateManyWithoutStudentNestedInput
    progresses?: ProgressUpdateManyWithoutStudentNestedInput
  }

  export type UserUncheckedUpdateWithoutFeedbacksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    courses?: CourseUncheckedUpdateManyWithoutTeacherNestedInput
    enrollments?: EnrollmentUncheckedUpdateManyWithoutStudentNestedInput
    quizAttempts?: QuizAttemptUncheckedUpdateManyWithoutStudentNestedInput
    progresses?: ProgressUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type CourseUpsertWithoutFeedbacksInput = {
    update: XOR<CourseUpdateWithoutFeedbacksInput, CourseUncheckedUpdateWithoutFeedbacksInput>
    create: XOR<CourseCreateWithoutFeedbacksInput, CourseUncheckedCreateWithoutFeedbacksInput>
    where?: CourseWhereInput
  }

  export type CourseUpdateToOneWithWhereWithoutFeedbacksInput = {
    where?: CourseWhereInput
    data: XOR<CourseUpdateWithoutFeedbacksInput, CourseUncheckedUpdateWithoutFeedbacksInput>
  }

  export type CourseUpdateWithoutFeedbacksInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnail?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacher?: UserUpdateOneRequiredWithoutCoursesNestedInput
    contents?: CourseContentUpdateManyWithoutCourseNestedInput
    enrollments?: EnrollmentUpdateManyWithoutCourseNestedInput
    quizzes?: QuizUpdateManyWithoutCourseNestedInput
    progresses?: ProgressUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateWithoutFeedbacksInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnail?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    teacherId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contents?: CourseContentUncheckedUpdateManyWithoutCourseNestedInput
    enrollments?: EnrollmentUncheckedUpdateManyWithoutCourseNestedInput
    quizzes?: QuizUncheckedUpdateManyWithoutCourseNestedInput
    progresses?: ProgressUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type CourseCreateWithoutTeacherInput = {
    id?: string
    title: string
    description: string
    thumbnail: string
    price: number
    createdAt?: Date | string
    contents?: CourseContentCreateNestedManyWithoutCourseInput
    enrollments?: EnrollmentCreateNestedManyWithoutCourseInput
    feedbacks?: FeedbackCreateNestedManyWithoutCourseInput
    quizzes?: QuizCreateNestedManyWithoutCourseInput
    progresses?: ProgressCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutTeacherInput = {
    id?: string
    title: string
    description: string
    thumbnail: string
    price: number
    createdAt?: Date | string
    contents?: CourseContentUncheckedCreateNestedManyWithoutCourseInput
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutCourseInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutCourseInput
    quizzes?: QuizUncheckedCreateNestedManyWithoutCourseInput
    progresses?: ProgressUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutTeacherInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutTeacherInput, CourseUncheckedCreateWithoutTeacherInput>
  }

  export type CourseCreateManyTeacherInputEnvelope = {
    data: CourseCreateManyTeacherInput | CourseCreateManyTeacherInput[]
    skipDuplicates?: boolean
  }

  export type FeedbackCreateWithoutUserInput = {
    id?: string
    rating: number
    comment: string
    createdAt?: Date | string
    course: CourseCreateNestedOneWithoutFeedbacksInput
  }

  export type FeedbackUncheckedCreateWithoutUserInput = {
    id?: string
    courseId: string
    rating: number
    comment: string
    createdAt?: Date | string
  }

  export type FeedbackCreateOrConnectWithoutUserInput = {
    where: FeedbackWhereUniqueInput
    create: XOR<FeedbackCreateWithoutUserInput, FeedbackUncheckedCreateWithoutUserInput>
  }

  export type FeedbackCreateManyUserInputEnvelope = {
    data: FeedbackCreateManyUserInput | FeedbackCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type EnrollmentCreateWithoutStudentInput = {
    id?: string
    enrolledAt?: Date | string
    course: CourseCreateNestedOneWithoutEnrollmentsInput
  }

  export type EnrollmentUncheckedCreateWithoutStudentInput = {
    id?: string
    courseId: string
    enrolledAt?: Date | string
  }

  export type EnrollmentCreateOrConnectWithoutStudentInput = {
    where: EnrollmentWhereUniqueInput
    create: XOR<EnrollmentCreateWithoutStudentInput, EnrollmentUncheckedCreateWithoutStudentInput>
  }

  export type EnrollmentCreateManyStudentInputEnvelope = {
    data: EnrollmentCreateManyStudentInput | EnrollmentCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type QuizAttemptCreateWithoutStudentInput = {
    id?: string
    score: number
    answers?: QuizAttemptCreateanswersInput | string[]
    submittedAt?: Date | string
    quiz: QuizCreateNestedOneWithoutAttemptsInput
  }

  export type QuizAttemptUncheckedCreateWithoutStudentInput = {
    id?: string
    quizId: string
    score: number
    answers?: QuizAttemptCreateanswersInput | string[]
    submittedAt?: Date | string
  }

  export type QuizAttemptCreateOrConnectWithoutStudentInput = {
    where: QuizAttemptWhereUniqueInput
    create: XOR<QuizAttemptCreateWithoutStudentInput, QuizAttemptUncheckedCreateWithoutStudentInput>
  }

  export type QuizAttemptCreateManyStudentInputEnvelope = {
    data: QuizAttemptCreateManyStudentInput | QuizAttemptCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type ProgressCreateWithoutStudentInput = {
    id?: string
    progressPercent: number
    completed: boolean
    course: CourseCreateNestedOneWithoutProgressesInput
  }

  export type ProgressUncheckedCreateWithoutStudentInput = {
    id?: string
    courseId: string
    progressPercent: number
    completed: boolean
  }

  export type ProgressCreateOrConnectWithoutStudentInput = {
    where: ProgressWhereUniqueInput
    create: XOR<ProgressCreateWithoutStudentInput, ProgressUncheckedCreateWithoutStudentInput>
  }

  export type ProgressCreateManyStudentInputEnvelope = {
    data: ProgressCreateManyStudentInput | ProgressCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type CourseUpsertWithWhereUniqueWithoutTeacherInput = {
    where: CourseWhereUniqueInput
    update: XOR<CourseUpdateWithoutTeacherInput, CourseUncheckedUpdateWithoutTeacherInput>
    create: XOR<CourseCreateWithoutTeacherInput, CourseUncheckedCreateWithoutTeacherInput>
  }

  export type CourseUpdateWithWhereUniqueWithoutTeacherInput = {
    where: CourseWhereUniqueInput
    data: XOR<CourseUpdateWithoutTeacherInput, CourseUncheckedUpdateWithoutTeacherInput>
  }

  export type CourseUpdateManyWithWhereWithoutTeacherInput = {
    where: CourseScalarWhereInput
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyWithoutTeacherInput>
  }

  export type CourseScalarWhereInput = {
    AND?: CourseScalarWhereInput | CourseScalarWhereInput[]
    OR?: CourseScalarWhereInput[]
    NOT?: CourseScalarWhereInput | CourseScalarWhereInput[]
    id?: StringFilter<"Course"> | string
    title?: StringFilter<"Course"> | string
    description?: StringFilter<"Course"> | string
    thumbnail?: StringFilter<"Course"> | string
    price?: FloatFilter<"Course"> | number
    teacherId?: StringFilter<"Course"> | string
    createdAt?: DateTimeFilter<"Course"> | Date | string
  }

  export type FeedbackUpsertWithWhereUniqueWithoutUserInput = {
    where: FeedbackWhereUniqueInput
    update: XOR<FeedbackUpdateWithoutUserInput, FeedbackUncheckedUpdateWithoutUserInput>
    create: XOR<FeedbackCreateWithoutUserInput, FeedbackUncheckedCreateWithoutUserInput>
  }

  export type FeedbackUpdateWithWhereUniqueWithoutUserInput = {
    where: FeedbackWhereUniqueInput
    data: XOR<FeedbackUpdateWithoutUserInput, FeedbackUncheckedUpdateWithoutUserInput>
  }

  export type FeedbackUpdateManyWithWhereWithoutUserInput = {
    where: FeedbackScalarWhereInput
    data: XOR<FeedbackUpdateManyMutationInput, FeedbackUncheckedUpdateManyWithoutUserInput>
  }

  export type EnrollmentUpsertWithWhereUniqueWithoutStudentInput = {
    where: EnrollmentWhereUniqueInput
    update: XOR<EnrollmentUpdateWithoutStudentInput, EnrollmentUncheckedUpdateWithoutStudentInput>
    create: XOR<EnrollmentCreateWithoutStudentInput, EnrollmentUncheckedCreateWithoutStudentInput>
  }

  export type EnrollmentUpdateWithWhereUniqueWithoutStudentInput = {
    where: EnrollmentWhereUniqueInput
    data: XOR<EnrollmentUpdateWithoutStudentInput, EnrollmentUncheckedUpdateWithoutStudentInput>
  }

  export type EnrollmentUpdateManyWithWhereWithoutStudentInput = {
    where: EnrollmentScalarWhereInput
    data: XOR<EnrollmentUpdateManyMutationInput, EnrollmentUncheckedUpdateManyWithoutStudentInput>
  }

  export type QuizAttemptUpsertWithWhereUniqueWithoutStudentInput = {
    where: QuizAttemptWhereUniqueInput
    update: XOR<QuizAttemptUpdateWithoutStudentInput, QuizAttemptUncheckedUpdateWithoutStudentInput>
    create: XOR<QuizAttemptCreateWithoutStudentInput, QuizAttemptUncheckedCreateWithoutStudentInput>
  }

  export type QuizAttemptUpdateWithWhereUniqueWithoutStudentInput = {
    where: QuizAttemptWhereUniqueInput
    data: XOR<QuizAttemptUpdateWithoutStudentInput, QuizAttemptUncheckedUpdateWithoutStudentInput>
  }

  export type QuizAttemptUpdateManyWithWhereWithoutStudentInput = {
    where: QuizAttemptScalarWhereInput
    data: XOR<QuizAttemptUpdateManyMutationInput, QuizAttemptUncheckedUpdateManyWithoutStudentInput>
  }

  export type ProgressUpsertWithWhereUniqueWithoutStudentInput = {
    where: ProgressWhereUniqueInput
    update: XOR<ProgressUpdateWithoutStudentInput, ProgressUncheckedUpdateWithoutStudentInput>
    create: XOR<ProgressCreateWithoutStudentInput, ProgressUncheckedCreateWithoutStudentInput>
  }

  export type ProgressUpdateWithWhereUniqueWithoutStudentInput = {
    where: ProgressWhereUniqueInput
    data: XOR<ProgressUpdateWithoutStudentInput, ProgressUncheckedUpdateWithoutStudentInput>
  }

  export type ProgressUpdateManyWithWhereWithoutStudentInput = {
    where: ProgressScalarWhereInput
    data: XOR<ProgressUpdateManyMutationInput, ProgressUncheckedUpdateManyWithoutStudentInput>
  }

  export type CourseContentCreateManyCourseInput = {
    id?: string
    title: string
    type: $Enums.ContentType
    url: string
    orderIndex: number
  }

  export type EnrollmentCreateManyCourseInput = {
    id?: string
    studentId: string
    enrolledAt?: Date | string
  }

  export type FeedbackCreateManyCourseInput = {
    id?: string
    userId: string
    rating: number
    comment: string
    createdAt?: Date | string
  }

  export type QuizCreateManyCourseInput = {
    id?: string
    title: string
    type: $Enums.QuizType
  }

  export type ProgressCreateManyCourseInput = {
    id?: string
    studentId: string
    progressPercent: number
    completed: boolean
  }

  export type CourseContentUpdateWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: EnumContentTypeFieldUpdateOperationsInput | $Enums.ContentType
    url?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
  }

  export type CourseContentUncheckedUpdateWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: EnumContentTypeFieldUpdateOperationsInput | $Enums.ContentType
    url?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
  }

  export type CourseContentUncheckedUpdateManyWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: EnumContentTypeFieldUpdateOperationsInput | $Enums.ContentType
    url?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
  }

  export type EnrollmentUpdateWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: UserUpdateOneRequiredWithoutEnrollmentsNestedInput
  }

  export type EnrollmentUncheckedUpdateWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnrollmentUncheckedUpdateManyWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackUpdateWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFeedbacksNestedInput
  }

  export type FeedbackUncheckedUpdateWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackUncheckedUpdateManyWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuizUpdateWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: EnumQuizTypeFieldUpdateOperationsInput | $Enums.QuizType
    questions?: QuizQuestionUpdateManyWithoutQuizNestedInput
    attempts?: QuizAttemptUpdateManyWithoutQuizNestedInput
  }

  export type QuizUncheckedUpdateWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: EnumQuizTypeFieldUpdateOperationsInput | $Enums.QuizType
    questions?: QuizQuestionUncheckedUpdateManyWithoutQuizNestedInput
    attempts?: QuizAttemptUncheckedUpdateManyWithoutQuizNestedInput
  }

  export type QuizUncheckedUpdateManyWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: EnumQuizTypeFieldUpdateOperationsInput | $Enums.QuizType
  }

  export type ProgressUpdateWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    progressPercent?: FloatFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    student?: UserUpdateOneRequiredWithoutProgressesNestedInput
  }

  export type ProgressUncheckedUpdateWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    progressPercent?: FloatFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProgressUncheckedUpdateManyWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    progressPercent?: FloatFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type QuizQuestionCreateManyQuizInput = {
    id?: string
    questionText: string
    options?: QuizQuestionCreateoptionsInput | string[]
    correctAnswer: string
  }

  export type QuizAttemptCreateManyQuizInput = {
    id?: string
    studentId: string
    score: number
    answers?: QuizAttemptCreateanswersInput | string[]
    submittedAt?: Date | string
  }

  export type QuizQuestionUpdateWithoutQuizInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionText?: StringFieldUpdateOperationsInput | string
    options?: QuizQuestionUpdateoptionsInput | string[]
    correctAnswer?: StringFieldUpdateOperationsInput | string
  }

  export type QuizQuestionUncheckedUpdateWithoutQuizInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionText?: StringFieldUpdateOperationsInput | string
    options?: QuizQuestionUpdateoptionsInput | string[]
    correctAnswer?: StringFieldUpdateOperationsInput | string
  }

  export type QuizQuestionUncheckedUpdateManyWithoutQuizInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionText?: StringFieldUpdateOperationsInput | string
    options?: QuizQuestionUpdateoptionsInput | string[]
    correctAnswer?: StringFieldUpdateOperationsInput | string
  }

  export type QuizAttemptUpdateWithoutQuizInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: FloatFieldUpdateOperationsInput | number
    answers?: QuizAttemptUpdateanswersInput | string[]
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: UserUpdateOneRequiredWithoutQuizAttemptsNestedInput
  }

  export type QuizAttemptUncheckedUpdateWithoutQuizInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    score?: FloatFieldUpdateOperationsInput | number
    answers?: QuizAttemptUpdateanswersInput | string[]
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuizAttemptUncheckedUpdateManyWithoutQuizInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    score?: FloatFieldUpdateOperationsInput | number
    answers?: QuizAttemptUpdateanswersInput | string[]
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseCreateManyTeacherInput = {
    id?: string
    title: string
    description: string
    thumbnail: string
    price: number
    createdAt?: Date | string
  }

  export type FeedbackCreateManyUserInput = {
    id?: string
    courseId: string
    rating: number
    comment: string
    createdAt?: Date | string
  }

  export type EnrollmentCreateManyStudentInput = {
    id?: string
    courseId: string
    enrolledAt?: Date | string
  }

  export type QuizAttemptCreateManyStudentInput = {
    id?: string
    quizId: string
    score: number
    answers?: QuizAttemptCreateanswersInput | string[]
    submittedAt?: Date | string
  }

  export type ProgressCreateManyStudentInput = {
    id?: string
    courseId: string
    progressPercent: number
    completed: boolean
  }

  export type CourseUpdateWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnail?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contents?: CourseContentUpdateManyWithoutCourseNestedInput
    enrollments?: EnrollmentUpdateManyWithoutCourseNestedInput
    feedbacks?: FeedbackUpdateManyWithoutCourseNestedInput
    quizzes?: QuizUpdateManyWithoutCourseNestedInput
    progresses?: ProgressUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnail?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contents?: CourseContentUncheckedUpdateManyWithoutCourseNestedInput
    enrollments?: EnrollmentUncheckedUpdateManyWithoutCourseNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutCourseNestedInput
    quizzes?: QuizUncheckedUpdateManyWithoutCourseNestedInput
    progresses?: ProgressUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateManyWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnail?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    course?: CourseUpdateOneRequiredWithoutFeedbacksNestedInput
  }

  export type FeedbackUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnrollmentUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    course?: CourseUpdateOneRequiredWithoutEnrollmentsNestedInput
  }

  export type EnrollmentUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnrollmentUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuizAttemptUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: FloatFieldUpdateOperationsInput | number
    answers?: QuizAttemptUpdateanswersInput | string[]
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quiz?: QuizUpdateOneRequiredWithoutAttemptsNestedInput
  }

  export type QuizAttemptUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    quizId?: StringFieldUpdateOperationsInput | string
    score?: FloatFieldUpdateOperationsInput | number
    answers?: QuizAttemptUpdateanswersInput | string[]
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuizAttemptUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    quizId?: StringFieldUpdateOperationsInput | string
    score?: FloatFieldUpdateOperationsInput | number
    answers?: QuizAttemptUpdateanswersInput | string[]
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgressUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    progressPercent?: FloatFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    course?: CourseUpdateOneRequiredWithoutProgressesNestedInput
  }

  export type ProgressUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    progressPercent?: FloatFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProgressUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    progressPercent?: FloatFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}