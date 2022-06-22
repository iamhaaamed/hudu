export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A coordinate is an array of positions. */
  Coordinates: any;
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: any;
  Geometry: any;
  /** A position is an array of numbers. There MUST be two or more elements. The first two elements are longitude and latitude, or easting and northing, precisely in that order and using decimal numbers. Altitude or elevation MAY be included as an optional third element. */
  Position: any;
};

export type AddProjectInput = {
  availability: Availability;
  city: Scalars['String'];
  description: Scalars['String'];
  duration?: InputMaybe<Scalars['Int']>;
  point: Scalars['Position'];
  projectImages?: InputMaybe<Array<InputMaybe<ProjectImagesInput>>>;
  state: Scalars['String'];
  streetAddress: Scalars['String'];
  title: Scalars['String'];
  zipCode: Scalars['String'];
};

export type AdminDashboardDto = {
  __typename?: 'AdminDashboardDto';
  activeBidsCount: Scalars['Int'];
  activeProjectsCount: Scalars['Int'];
  activeUsersCount: Scalars['Int'];
  balance: Scalars['Float'];
};

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER',
}

export enum Availability {
  Flexible = 'FLEXIBLE',
  SomeFlexibility = 'SOME_FLEXIBILITY',
  SpecificTime = 'SPECIFIC_TIME',
}

export type AvailabilityOperationFilterInput = {
  eq?: InputMaybe<Availability>;
  in?: InputMaybe<Array<Availability>>;
  neq?: InputMaybe<Availability>;
  nin?: InputMaybe<Array<Availability>>;
};

export type Bid = {
  __typename?: 'Bid';
  amount: Scalars['Float'];
  bidStatus: BidStatus;
  createdDate: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  hudu?: Maybe<Users>;
  huduId: Scalars['Int'];
  hudusComment?: Maybe<Scalars['String']>;
  hudusRate?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  isHuduCommented: Scalars['Boolean'];
  isListerCommented: Scalars['Boolean'];
  lister?: Maybe<Users>;
  listerId: Scalars['Int'];
  listersComment?: Maybe<Scalars['String']>;
  listersRate?: Maybe<Scalars['String']>;
  payments?: Maybe<Array<Maybe<Payment>>>;
  project?: Maybe<Project>;
  projectId: Scalars['Int'];
};

export type BidCollectionSegment = {
  __typename?: 'BidCollectionSegment';
  items?: Maybe<Array<Maybe<Bid>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type BidFilterInput = {
  amount?: InputMaybe<ComparableDoubleOperationFilterInput>;
  and?: InputMaybe<Array<BidFilterInput>>;
  bidStatus?: InputMaybe<BidStatusOperationFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  hudu?: InputMaybe<UsersFilterInput>;
  huduId?: InputMaybe<ComparableInt32OperationFilterInput>;
  hudusComment?: InputMaybe<StringOperationFilterInput>;
  hudusRate?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isHuduCommented?: InputMaybe<BooleanOperationFilterInput>;
  isListerCommented?: InputMaybe<BooleanOperationFilterInput>;
  lister?: InputMaybe<UsersFilterInput>;
  listerId?: InputMaybe<ComparableInt32OperationFilterInput>;
  listersComment?: InputMaybe<StringOperationFilterInput>;
  listersRate?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<BidFilterInput>>;
  payments?: InputMaybe<ListFilterInputTypeOfPaymentFilterInput>;
  project?: InputMaybe<ProjectFilterInput>;
  projectId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type BidInput = {
  amount: Scalars['Float'];
  description: Scalars['String'];
  projectId: Scalars['Int'];
};

export type BidSortInput = {
  amount?: InputMaybe<SortEnumType>;
  bidStatus?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  hudu?: InputMaybe<UsersSortInput>;
  huduId?: InputMaybe<SortEnumType>;
  hudusComment?: InputMaybe<SortEnumType>;
  hudusRate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isHuduCommented?: InputMaybe<SortEnumType>;
  isListerCommented?: InputMaybe<SortEnumType>;
  lister?: InputMaybe<UsersSortInput>;
  listerId?: InputMaybe<SortEnumType>;
  listersComment?: InputMaybe<SortEnumType>;
  listersRate?: InputMaybe<SortEnumType>;
  project?: InputMaybe<ProjectSortInput>;
  projectId?: InputMaybe<SortEnumType>;
};

export enum BidStatus {
  Cancell = 'CANCELL',
  Failed = 'FAILED',
  Finished = 'FINISHED',
  InProgress = 'IN_PROGRESS',
  NotLucky = 'NOT_LUCKY',
  Waiting = 'WAITING',
}

export type BidStatusOperationFilterInput = {
  eq?: InputMaybe<BidStatus>;
  in?: InputMaybe<Array<BidStatus>>;
  neq?: InputMaybe<BidStatus>;
  nin?: InputMaybe<Array<BidStatus>>;
};

export type BooleanOperationFilterInput = {
  eq?: InputMaybe<Scalars['Boolean']>;
  neq?: InputMaybe<Scalars['Boolean']>;
};

/** Information about the offset pagination. */
export type CollectionSegmentInfo = {
  __typename?: 'CollectionSegmentInfo';
  /** Indicates whether more items exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean'];
  /** Indicates whether more items exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean'];
};

export type ComparableDateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  neq?: InputMaybe<Scalars['DateTime']>;
  ngt?: InputMaybe<Scalars['DateTime']>;
  ngte?: InputMaybe<Scalars['DateTime']>;
  nin?: InputMaybe<Array<Scalars['DateTime']>>;
  nlt?: InputMaybe<Scalars['DateTime']>;
  nlte?: InputMaybe<Scalars['DateTime']>;
};

export type ComparableDoubleOperationFilterInput = {
  eq?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  neq?: InputMaybe<Scalars['Float']>;
  ngt?: InputMaybe<Scalars['Float']>;
  ngte?: InputMaybe<Scalars['Float']>;
  nin?: InputMaybe<Array<Scalars['Float']>>;
  nlt?: InputMaybe<Scalars['Float']>;
  nlte?: InputMaybe<Scalars['Float']>;
};

export type ComparableInt32OperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  neq?: InputMaybe<Scalars['Int']>;
  ngt?: InputMaybe<Scalars['Int']>;
  ngte?: InputMaybe<Scalars['Int']>;
  nin?: InputMaybe<Array<Scalars['Int']>>;
  nlt?: InputMaybe<Scalars['Int']>;
  nlte?: InputMaybe<Scalars['Int']>;
};

export type ComparableNullableOfInt32OperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  neq?: InputMaybe<Scalars['Int']>;
  ngt?: InputMaybe<Scalars['Int']>;
  ngte?: InputMaybe<Scalars['Int']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  nlt?: InputMaybe<Scalars['Int']>;
  nlte?: InputMaybe<Scalars['Int']>;
};

export type ConversationDto = {
  __typename?: 'ConversationDto';
  conversationId: Scalars['Int'];
  latestMessageDate: Scalars['DateTime'];
  subject?: Maybe<Scalars['String']>;
  unreadCount: Scalars['Int'];
  user?: Maybe<Users>;
  userEmail?: Maybe<Scalars['String']>;
  userFirstName?: Maybe<Scalars['String']>;
  userLastName?: Maybe<Scalars['String']>;
};

export type ConversationDtoCollectionSegment = {
  __typename?: 'ConversationDtoCollectionSegment';
  items?: Maybe<Array<Maybe<ConversationDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type ConversationDtoFilterInput = {
  and?: InputMaybe<Array<ConversationDtoFilterInput>>;
  conversationId?: InputMaybe<ComparableInt32OperationFilterInput>;
  latestMessageDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  or?: InputMaybe<Array<ConversationDtoFilterInput>>;
  subject?: InputMaybe<StringOperationFilterInput>;
  unreadCount?: InputMaybe<ComparableInt32OperationFilterInput>;
  user?: InputMaybe<UsersFilterInput>;
  userEmail?: InputMaybe<StringOperationFilterInput>;
  userFirstName?: InputMaybe<StringOperationFilterInput>;
  userLastName?: InputMaybe<StringOperationFilterInput>;
};

export type ConversationDtoSortInput = {
  conversationId?: InputMaybe<SortEnumType>;
  latestMessageDate?: InputMaybe<SortEnumType>;
  subject?: InputMaybe<SortEnumType>;
  unreadCount?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UsersSortInput>;
  userEmail?: InputMaybe<SortEnumType>;
  userFirstName?: InputMaybe<SortEnumType>;
  userLastName?: InputMaybe<SortEnumType>;
};

export type Conversations = {
  __typename?: 'Conversations';
  createdDate: Scalars['DateTime'];
  firstUnreadCount: Scalars['Int'];
  firstUser?: Maybe<Users>;
  firstUserId: Scalars['Int'];
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  latestMessageDate: Scalars['DateTime'];
  messages?: Maybe<Array<Maybe<Messages>>>;
  secondUnreadCount: Scalars['Int'];
  secondUser?: Maybe<Users>;
  secondUserId: Scalars['Int'];
  subject?: Maybe<Scalars['String']>;
};

export type ConversationsFilterInput = {
  and?: InputMaybe<Array<ConversationsFilterInput>>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  firstUnreadCount?: InputMaybe<ComparableInt32OperationFilterInput>;
  firstUser?: InputMaybe<UsersFilterInput>;
  firstUserId?: InputMaybe<ComparableInt32OperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  latestMessageDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  messages?: InputMaybe<ListFilterInputTypeOfMessagesFilterInput>;
  or?: InputMaybe<Array<ConversationsFilterInput>>;
  secondUnreadCount?: InputMaybe<ComparableInt32OperationFilterInput>;
  secondUser?: InputMaybe<UsersFilterInput>;
  secondUserId?: InputMaybe<ComparableInt32OperationFilterInput>;
  subject?: InputMaybe<StringOperationFilterInput>;
};

export type ConversationsSortInput = {
  createdDate?: InputMaybe<SortEnumType>;
  firstUnreadCount?: InputMaybe<SortEnumType>;
  firstUser?: InputMaybe<UsersSortInput>;
  firstUserId?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  latestMessageDate?: InputMaybe<SortEnumType>;
  secondUnreadCount?: InputMaybe<SortEnumType>;
  secondUser?: InputMaybe<UsersSortInput>;
  secondUserId?: InputMaybe<SortEnumType>;
  subject?: InputMaybe<SortEnumType>;
};

export type EditBidInput = {
  amount?: InputMaybe<Scalars['Float']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
};

export type EditProjectInput = {
  availability?: InputMaybe<Availability>;
  city?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['Int']>;
  id: Scalars['Int'];
  point?: InputMaybe<Scalars['Position']>;
  projectImages?: InputMaybe<Array<InputMaybe<ProjectImagesInput>>>;
  state?: InputMaybe<Scalars['String']>;
  streetAddress?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  zipCode?: InputMaybe<Scalars['String']>;
};

export type EmailInput = {
  htmlContent?: InputMaybe<Scalars['String']>;
  plainTextContent?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
};

export type FeedbackInput = {
  bidId: Scalars['Int'];
  hudusComment?: InputMaybe<Scalars['String']>;
  hudusRate: Scalars['Int'];
  listersComment?: InputMaybe<Scalars['String']>;
  listersRate: Scalars['Int'];
};

export enum GeoJsonGeometryType {
  GeometryCollection = 'GeometryCollection',
  LineString = 'LineString',
  MultiLineString = 'MultiLineString',
  MultiPoint = 'MultiPoint',
  MultiPolygon = 'MultiPolygon',
  Point = 'Point',
  Polygon = 'Polygon',
}

export type GeoJsonInterface = {
  /** The minimum bounding box around the geometry object */
  bbox?: Maybe<Array<Maybe<Scalars['Float']>>>;
  /** The coordinate reference system integer identifier */
  crs?: Maybe<Scalars['Int']>;
  /** The geometry type of the GeoJson object */
  type: GeoJsonGeometryType;
};

export type GeoJsonLineStringInput = {
  /** The "coordinates" field is an array of two or more positions. */
  coordinates?: InputMaybe<Array<InputMaybe<Scalars['Position']>>>;
  /** The coordinate reference system integer identifier */
  crs?: InputMaybe<Scalars['Int']>;
  /** The geometry type of the GeoJson object */
  type?: InputMaybe<GeoJsonGeometryType>;
};

export type GeoJsonLineStringType = GeoJsonInterface & {
  __typename?: 'GeoJSONLineStringType';
  /** The minimum bounding box around the geometry object */
  bbox: Array<Scalars['Float']>;
  /** The "coordinates" field is an array of two or more positions. */
  coordinates?: Maybe<Array<Maybe<Scalars['Position']>>>;
  /** The coordinate reference system integer identifier */
  crs: Scalars['Int'];
  /** The geometry type of the GeoJson object */
  type: GeoJsonGeometryType;
};

export type GeoJsonMultiLineStringInput = {
  /** The "coordinates" field is an array of LineString coordinate arrays. */
  coordinates?: InputMaybe<
    Array<InputMaybe<Array<InputMaybe<Scalars['Position']>>>>
  >;
  /** The coordinate reference system integer identifier */
  crs?: InputMaybe<Scalars['Int']>;
  /** The geometry type of the GeoJson object */
  type?: InputMaybe<GeoJsonGeometryType>;
};

export type GeoJsonMultiLineStringType = GeoJsonInterface & {
  __typename?: 'GeoJSONMultiLineStringType';
  /** The minimum bounding box around the geometry object */
  bbox: Array<Scalars['Float']>;
  /** The "coordinates" field is an array of LineString coordinate arrays. */
  coordinates?: Maybe<Array<Maybe<Scalars['Position']>>>;
  /** The coordinate reference system integer identifier */
  crs: Scalars['Int'];
  /** The geometry type of the GeoJson object */
  type: GeoJsonGeometryType;
};

export type GeoJsonMultiPointInput = {
  /** The "coordinates" field is an array of positions. */
  coordinates?: InputMaybe<Array<InputMaybe<Scalars['Position']>>>;
  /** The coordinate reference system integer identifier */
  crs?: InputMaybe<Scalars['Int']>;
  /** The geometry type of the GeoJson object */
  type?: InputMaybe<GeoJsonGeometryType>;
};

export type GeoJsonMultiPointType = GeoJsonInterface & {
  __typename?: 'GeoJSONMultiPointType';
  /** The minimum bounding box around the geometry object */
  bbox: Array<Scalars['Float']>;
  /** The "coordinates" field is an array of positions. */
  coordinates?: Maybe<Array<Maybe<Scalars['Position']>>>;
  /** The coordinate reference system integer identifier */
  crs: Scalars['Int'];
  /** The geometry type of the GeoJson object */
  type: GeoJsonGeometryType;
};

export type GeoJsonMultiPolygonInput = {
  /** The "coordinates" field is an array of Polygon coordinate arrays. */
  coordinates?: InputMaybe<Scalars['Coordinates']>;
  /** The coordinate reference system integer identifier */
  crs?: InputMaybe<Scalars['Int']>;
  /** The geometry type of the GeoJson object */
  type?: InputMaybe<GeoJsonGeometryType>;
};

export type GeoJsonMultiPolygonType = GeoJsonInterface & {
  __typename?: 'GeoJSONMultiPolygonType';
  /** The minimum bounding box around the geometry object */
  bbox: Array<Scalars['Float']>;
  /** The "coordinates" field is an array of Polygon coordinate arrays. */
  coordinates?: Maybe<Scalars['Coordinates']>;
  /** The coordinate reference system integer identifier */
  crs: Scalars['Int'];
  /** The geometry type of the GeoJson object */
  type: GeoJsonGeometryType;
};

export type GeoJsonPointInput = {
  /** The "coordinates" field is a single position. */
  coordinates?: InputMaybe<Scalars['Position']>;
  /** The coordinate reference system integer identifier */
  crs?: InputMaybe<Scalars['Int']>;
  /** The geometry type of the GeoJson object */
  type?: InputMaybe<GeoJsonGeometryType>;
};

export type GeoJsonPointType = GeoJsonInterface & {
  __typename?: 'GeoJSONPointType';
  /** The minimum bounding box around the geometry object */
  bbox: Array<Scalars['Float']>;
  /** The "coordinates" field is a single position. */
  coordinates?: Maybe<Scalars['Position']>;
  /** The coordinate reference system integer identifier */
  crs: Scalars['Int'];
  /** The geometry type of the GeoJson object */
  type: GeoJsonGeometryType;
};

export type GeoJsonPolygonInput = {
  /** The "coordinates" field MUST be an array of linear ring coordinate arrays. For Polygons with more than one of these rings, the first MUST be the exterior ring, and any others MUST be interior rings. The exterior ring bounds the surface, and the interior rings (if present) bound holes within the surface. */
  coordinates?: InputMaybe<
    Array<InputMaybe<Array<InputMaybe<Scalars['Position']>>>>
  >;
  /** The coordinate reference system integer identifier */
  crs?: InputMaybe<Scalars['Int']>;
  /** The geometry type of the GeoJson object */
  type?: InputMaybe<GeoJsonGeometryType>;
};

export type GeoJsonPolygonType = GeoJsonInterface & {
  __typename?: 'GeoJSONPolygonType';
  /** The minimum bounding box around the geometry object */
  bbox: Array<Scalars['Float']>;
  /** The "coordinates" field MUST be an array of linear ring coordinate arrays. For Polygons with more than one of these rings, the first MUST be the exterior ring, and any others MUST be interior rings. The exterior ring bounds the surface, and the interior rings (if present) bound holes within the surface. */
  coordinates?: Maybe<Array<Maybe<Array<Maybe<Scalars['Position']>>>>>;
  /** The coordinate reference system integer identifier */
  crs: Scalars['Int'];
  /** The geometry type of the GeoJson object */
  type: GeoJsonGeometryType;
};

export type ListFilterInputTypeOfBidFilterInput = {
  all?: InputMaybe<BidFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<BidFilterInput>;
  some?: InputMaybe<BidFilterInput>;
};

export type ListFilterInputTypeOfMessagesFilterInput = {
  all?: InputMaybe<MessagesFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<MessagesFilterInput>;
  some?: InputMaybe<MessagesFilterInput>;
};

export type ListFilterInputTypeOfNotificationFilterInput = {
  all?: InputMaybe<NotificationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<NotificationFilterInput>;
  some?: InputMaybe<NotificationFilterInput>;
};

export type ListFilterInputTypeOfPaymentFilterInput = {
  all?: InputMaybe<PaymentFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<PaymentFilterInput>;
  some?: InputMaybe<PaymentFilterInput>;
};

export type ListFilterInputTypeOfProjectFilterInput = {
  all?: InputMaybe<ProjectFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<ProjectFilterInput>;
  some?: InputMaybe<ProjectFilterInput>;
};

export type ListFilterInputTypeOfProjectImagesFilterInput = {
  all?: InputMaybe<ProjectImagesFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<ProjectImagesFilterInput>;
  some?: InputMaybe<ProjectImagesFilterInput>;
};

export type ListFilterInputTypeOfQuestionFilterInput = {
  all?: InputMaybe<QuestionFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<QuestionFilterInput>;
  some?: InputMaybe<QuestionFilterInput>;
};

export type ListFilterInputTypeOfUserLikeProjectFilterInput = {
  all?: InputMaybe<UserLikeProjectFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<UserLikeProjectFilterInput>;
  some?: InputMaybe<UserLikeProjectFilterInput>;
};

export type ListResponseBaseOfBid = {
  __typename?: 'ListResponseBaseOfBid';
  result?: Maybe<BidCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfBidResultArgs = {
  order?: InputMaybe<Array<BidSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BidFilterInput>;
};

export type ListResponseBaseOfConversationDto = {
  __typename?: 'ListResponseBaseOfConversationDto';
  result?: Maybe<ConversationDtoCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfConversationDtoResultArgs = {
  order?: InputMaybe<Array<ConversationDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ConversationDtoFilterInput>;
};

export type ListResponseBaseOfMessages = {
  __typename?: 'ListResponseBaseOfMessages';
  result?: Maybe<MessagesCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfMessagesResultArgs = {
  order?: InputMaybe<Array<MessagesSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<MessagesFilterInput>;
};

export type ListResponseBaseOfNotification = {
  __typename?: 'ListResponseBaseOfNotification';
  result?: Maybe<NotificationCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfNotificationResultArgs = {
  order?: InputMaybe<Array<NotificationSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<NotificationFilterInput>;
};

export type ListResponseBaseOfProjectDto = {
  __typename?: 'ListResponseBaseOfProjectDto';
  result?: Maybe<ProjectDtoCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfProjectDtoResultArgs = {
  order?: InputMaybe<Array<ProjectDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProjectDtoFilterInput>;
};

export type ListResponseBaseOfQuestion = {
  __typename?: 'ListResponseBaseOfQuestion';
  result?: Maybe<QuestionCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfQuestionResultArgs = {
  order?: InputMaybe<Array<QuestionSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<QuestionFilterInput>;
};

export type ListResponseBaseOfUsers = {
  __typename?: 'ListResponseBaseOfUsers';
  result?: Maybe<UsersCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfUsersResultArgs = {
  order?: InputMaybe<Array<UsersSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UsersFilterInput>;
};

export type MessageInput = {
  conversationId?: InputMaybe<Scalars['Int']>;
  messageType: MessageTypes;
  photoUrl?: InputMaybe<Scalars['String']>;
  receiverId?: InputMaybe<Scalars['Int']>;
  subject?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
};

export enum MessageTypes {
  File = 'FILE',
  Photo = 'PHOTO',
  Text = 'TEXT',
  Video = 'VIDEO',
  Voice = 'VOICE',
}

export type MessageTypesOperationFilterInput = {
  eq?: InputMaybe<MessageTypes>;
  in?: InputMaybe<Array<MessageTypes>>;
  neq?: InputMaybe<MessageTypes>;
  nin?: InputMaybe<Array<MessageTypes>>;
};

export type Messages = {
  __typename?: 'Messages';
  conversation?: Maybe<Conversations>;
  conversationId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  createdDate: Scalars['DateTime'];
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  messageType: MessageTypes;
  photoUrl?: Maybe<Scalars['String']>;
  sender?: Maybe<Users>;
  senderId: Scalars['Int'];
  text?: Maybe<Scalars['String']>;
};

export type MessagesCollectionSegment = {
  __typename?: 'MessagesCollectionSegment';
  items?: Maybe<Array<Maybe<Messages>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type MessagesFilterInput = {
  and?: InputMaybe<Array<MessagesFilterInput>>;
  conversation?: InputMaybe<ConversationsFilterInput>;
  conversationId?: InputMaybe<ComparableInt32OperationFilterInput>;
  createdAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  messageType?: InputMaybe<MessageTypesOperationFilterInput>;
  or?: InputMaybe<Array<MessagesFilterInput>>;
  photoUrl?: InputMaybe<StringOperationFilterInput>;
  sender?: InputMaybe<UsersFilterInput>;
  senderId?: InputMaybe<ComparableInt32OperationFilterInput>;
  text?: InputMaybe<StringOperationFilterInput>;
};

export type MessagesSortInput = {
  conversation?: InputMaybe<ConversationsSortInput>;
  conversationId?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  messageType?: InputMaybe<SortEnumType>;
  photoUrl?: InputMaybe<SortEnumType>;
  sender?: InputMaybe<UsersSortInput>;
  senderId?: InputMaybe<SortEnumType>;
  text?: InputMaybe<SortEnumType>;
};

export type Mutation = {
  __typename?: 'Mutation';
  bid_acceptBid?: Maybe<ResponseBaseOfBid>;
  bid_addBid?: Maybe<ResponseBaseOfBid>;
  bid_cancellBid?: Maybe<ResponseBaseOfBid>;
  bid_deleteBid?: Maybe<ResponseBaseOfBid>;
  bid_editBid?: Maybe<ResponseBaseOfBid>;
  bid_rejectBid?: Maybe<ResponseBaseOfBid>;
  message_createMessage?: Maybe<ResponseBaseOfMessages>;
  message_deleteMessage?: Maybe<ResponseBaseOfMessages>;
  message_removeConversation?: Maybe<ResponseBase>;
  notification_addNotification?: Maybe<ListResponseBaseOfNotification>;
  notification_readNotification?: Maybe<ResponseBaseOfNotification>;
  project_addFeedBack?: Maybe<ResponseBaseOfBid>;
  project_addImageToProject?: Maybe<ResponseBaseOfProjectImages>;
  project_addProject?: Maybe<ResponseBaseOfProject>;
  project_addQuestion?: Maybe<ResponseBaseOfQuestion>;
  project_deleteProject?: Maybe<ResponseBaseOfProject>;
  project_editProject?: Maybe<ResponseBaseOfProject>;
  project_faileProject?: Maybe<ResponseBaseOfProject>;
  project_finisheProject?: Maybe<ResponseBaseOfProject>;
  project_like?: Maybe<ResponseBaseOfUserLikeProject>;
  project_reopenProject?: Maybe<ResponseBaseOfProject>;
  project_unlike?: Maybe<ResponseBaseOfUserLikeProject>;
  user_UpdateLastSeen?: Maybe<ResponseBaseOfUsers>;
  user_activationUser?: Maybe<ResponseBaseOfUsers>;
  user_sendEmail: ResponseStatus;
  user_signUp?: Maybe<ResponseBaseOfUsers>;
  user_updateProfile?: Maybe<ResponseBaseOfUsers>;
};

export type MutationBid_AcceptBidArgs = {
  bidId: Scalars['Int'];
};

export type MutationBid_AddBidArgs = {
  bidInput?: InputMaybe<BidInput>;
};

export type MutationBid_CancellBidArgs = {
  bidId: Scalars['Int'];
};

export type MutationBid_DeleteBidArgs = {
  bidId: Scalars['Int'];
};

export type MutationBid_EditBidArgs = {
  editBidInput?: InputMaybe<EditBidInput>;
};

export type MutationBid_RejectBidArgs = {
  bidId: Scalars['Int'];
};

export type MutationMessage_CreateMessageArgs = {
  messageInput?: InputMaybe<MessageInput>;
};

export type MutationMessage_DeleteMessageArgs = {
  messageId: Scalars['Int'];
};

export type MutationMessage_RemoveConversationArgs = {
  conversationId: Scalars['Int'];
};

export type MutationNotification_AddNotificationArgs = {
  notifications?: InputMaybe<Array<InputMaybe<NotificationInputsInput>>>;
};

export type MutationNotification_ReadNotificationArgs = {
  notificationId: Scalars['Int'];
};

export type MutationProject_AddFeedBackArgs = {
  feedbackInput?: InputMaybe<FeedbackInput>;
};

export type MutationProject_AddImageToProjectArgs = {
  imageAddress?: InputMaybe<Scalars['String']>;
  projectId: Scalars['Int'];
};

export type MutationProject_AddProjectArgs = {
  addProjectInput?: InputMaybe<AddProjectInput>;
};

export type MutationProject_AddQuestionArgs = {
  questionInput?: InputMaybe<QuestionInput>;
};

export type MutationProject_DeleteProjectArgs = {
  projectId: Scalars['Int'];
};

export type MutationProject_EditProjectArgs = {
  editProjectInput?: InputMaybe<EditProjectInput>;
};

export type MutationProject_FaileProjectArgs = {
  projectId: Scalars['Int'];
};

export type MutationProject_FinisheProjectArgs = {
  projectId: Scalars['Int'];
};

export type MutationProject_LikeArgs = {
  projectId: Scalars['Int'];
};

export type MutationProject_ReopenProjectArgs = {
  projectId: Scalars['Int'];
};

export type MutationProject_UnlikeArgs = {
  projectId: Scalars['Int'];
  userId?: InputMaybe<Scalars['Int']>;
};

export type MutationUser_ActivationUserArgs = {
  isActive: Scalars['Boolean'];
  userId: Scalars['Int'];
};

export type MutationUser_SendEmailArgs = {
  email?: InputMaybe<EmailInput>;
};

export type MutationUser_UpdateProfileArgs = {
  userInput?: InputMaybe<UserInput>;
};

export type Notification = {
  __typename?: 'Notification';
  createdDate: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  isReaded: Scalars['Boolean'];
  notificationType: NotificationType;
  title?: Maybe<Scalars['String']>;
  user?: Maybe<Users>;
  userId: Scalars['Int'];
};

export type NotificationCollectionSegment = {
  __typename?: 'NotificationCollectionSegment';
  items?: Maybe<Array<Maybe<Notification>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type NotificationFilterInput = {
  and?: InputMaybe<Array<NotificationFilterInput>>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isReaded?: InputMaybe<BooleanOperationFilterInput>;
  notificationType?: InputMaybe<NotificationTypeOperationFilterInput>;
  or?: InputMaybe<Array<NotificationFilterInput>>;
  title?: InputMaybe<StringOperationFilterInput>;
  user?: InputMaybe<UsersFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type NotificationInputsInput = {
  description: Scalars['String'];
  title: Scalars['String'];
  userId: Scalars['Int'];
};

export type NotificationSortInput = {
  createdDate?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isReaded?: InputMaybe<SortEnumType>;
  notificationType?: InputMaybe<SortEnumType>;
  title?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UsersSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export enum NotificationType {
  BidApprovedByLister = 'BID_APPROVED_BY_LISTER',
  BidCancelledByHudu = 'BID_CANCELLED_BY_HUDU',
  BidRejectedByLister = 'BID_REJECTED_BY_LISTER',
  BidWasDeleted = 'BID_WAS_DELETED',
  BidWasEdited = 'BID_WAS_EDITED',
  CreateChat = 'CREATE_CHAT',
  NewBidGiven = 'NEW_BID_GIVEN',
  Other = 'OTHER',
  ProjectFailedByLister = 'PROJECT_FAILED_BY_LISTER',
  ProjectFinishedByLister = 'PROJECT_FINISHED_BY_LISTER',
}

export type NotificationTypeOperationFilterInput = {
  eq?: InputMaybe<NotificationType>;
  in?: InputMaybe<Array<NotificationType>>;
  neq?: InputMaybe<NotificationType>;
  nin?: InputMaybe<Array<NotificationType>>;
};

export type Payment = {
  __typename?: 'Payment';
  amount: Scalars['Float'];
  bid?: Maybe<Bid>;
  bidId: Scalars['Int'];
  clientSecret?: Maybe<Scalars['String']>;
  createdDate: Scalars['DateTime'];
  id: Scalars['Int'];
  intentId?: Maybe<Scalars['String']>;
  intentStatus?: Maybe<Scalars['String']>;
  isDeleted: Scalars['Boolean'];
  user?: Maybe<Users>;
  userId: Scalars['Int'];
};

export type PaymentFilterInput = {
  amount?: InputMaybe<ComparableDoubleOperationFilterInput>;
  and?: InputMaybe<Array<PaymentFilterInput>>;
  bid?: InputMaybe<BidFilterInput>;
  bidId?: InputMaybe<ComparableInt32OperationFilterInput>;
  clientSecret?: InputMaybe<StringOperationFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  intentId?: InputMaybe<StringOperationFilterInput>;
  intentStatus?: InputMaybe<StringOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<PaymentFilterInput>>;
  user?: InputMaybe<UsersFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type Project = {
  __typename?: 'Project';
  availability: Availability;
  bids?: Maybe<Array<Maybe<Bid>>>;
  city?: Maybe<Scalars['String']>;
  createdDate: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  duration: Scalars['Int'];
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  projectDeadLine: Scalars['DateTime'];
  projectImages?: Maybe<Array<Maybe<ProjectImages>>>;
  projectStatus: ProjectStatus;
  questions?: Maybe<Array<Maybe<Question>>>;
  state?: Maybe<Scalars['String']>;
  streetAddress?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  user?: Maybe<Users>;
  userId: Scalars['Int'];
  userLikeProjects?: Maybe<Array<Maybe<UserLikeProject>>>;
  zipCode?: Maybe<Scalars['String']>;
};

export type ProjectDto = {
  __typename?: 'ProjectDto';
  bids?: Maybe<Array<Maybe<Bid>>>;
  isLiked: Scalars['Boolean'];
  project?: Maybe<Project>;
};

export type ProjectDtoCollectionSegment = {
  __typename?: 'ProjectDtoCollectionSegment';
  items?: Maybe<Array<Maybe<ProjectDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type ProjectDtoFilterInput = {
  and?: InputMaybe<Array<ProjectDtoFilterInput>>;
  bids?: InputMaybe<ListFilterInputTypeOfBidFilterInput>;
  isLiked?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<ProjectDtoFilterInput>>;
  project?: InputMaybe<ProjectFilterInput>;
};

export type ProjectDtoSortInput = {
  isLiked?: InputMaybe<SortEnumType>;
  project?: InputMaybe<ProjectSortInput>;
};

export enum ProjectFilter {
  ClosetToCurrentLocation = 'CLOSET_TO_CURRENT_LOCATION',
  HighToLowBids = 'HIGH_TO_LOW_BIDS',
  LowToHighBids = 'LOW_TO_HIGH_BIDS',
  MyZipCode = 'MY_ZIP_CODE',
  NewestToOldest = 'NEWEST_TO_OLDEST',
  OldestToNewest = 'OLDEST_TO_NEWEST',
}

export type ProjectFilterInput = {
  and?: InputMaybe<Array<ProjectFilterInput>>;
  availability?: InputMaybe<AvailabilityOperationFilterInput>;
  bids?: InputMaybe<ListFilterInputTypeOfBidFilterInput>;
  city?: InputMaybe<StringOperationFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  duration?: InputMaybe<ComparableInt32OperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  latitude?: InputMaybe<ComparableDoubleOperationFilterInput>;
  longitude?: InputMaybe<ComparableDoubleOperationFilterInput>;
  or?: InputMaybe<Array<ProjectFilterInput>>;
  projectDeadLine?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  projectImages?: InputMaybe<ListFilterInputTypeOfProjectImagesFilterInput>;
  projectStatus?: InputMaybe<ProjectStatusOperationFilterInput>;
  questions?: InputMaybe<ListFilterInputTypeOfQuestionFilterInput>;
  state?: InputMaybe<StringOperationFilterInput>;
  streetAddress?: InputMaybe<StringOperationFilterInput>;
  title?: InputMaybe<StringOperationFilterInput>;
  user?: InputMaybe<UsersFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
  userLikeProjects?: InputMaybe<ListFilterInputTypeOfUserLikeProjectFilterInput>;
  zipCode?: InputMaybe<StringOperationFilterInput>;
};

export type ProjectImages = {
  __typename?: 'ProjectImages';
  createdDate: Scalars['DateTime'];
  id: Scalars['Int'];
  imageAddress?: Maybe<Scalars['String']>;
  isDeleted: Scalars['Boolean'];
  project?: Maybe<Project>;
  projectId: Scalars['Int'];
};

export type ProjectImagesFilterInput = {
  and?: InputMaybe<Array<ProjectImagesFilterInput>>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  imageAddress?: InputMaybe<StringOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<ProjectImagesFilterInput>>;
  project?: InputMaybe<ProjectFilterInput>;
  projectId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type ProjectImagesInput = {
  imageAddress?: InputMaybe<Scalars['String']>;
};

export type ProjectSortInput = {
  availability?: InputMaybe<SortEnumType>;
  city?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  duration?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  latitude?: InputMaybe<SortEnumType>;
  longitude?: InputMaybe<SortEnumType>;
  projectDeadLine?: InputMaybe<SortEnumType>;
  projectStatus?: InputMaybe<SortEnumType>;
  state?: InputMaybe<SortEnumType>;
  streetAddress?: InputMaybe<SortEnumType>;
  title?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UsersSortInput>;
  userId?: InputMaybe<SortEnumType>;
  zipCode?: InputMaybe<SortEnumType>;
};

export enum ProjectStatus {
  Bidding = 'BIDDING',
  Failed = 'FAILED',
  Finished = 'FINISHED',
  InProgress = 'IN_PROGRESS',
}

export type ProjectStatusOperationFilterInput = {
  eq?: InputMaybe<ProjectStatus>;
  in?: InputMaybe<Array<ProjectStatus>>;
  neq?: InputMaybe<ProjectStatus>;
  nin?: InputMaybe<Array<ProjectStatus>>;
};

export type Query = {
  __typename?: 'Query';
  bid_getBids?: Maybe<ListResponseBaseOfBid>;
  message_getConversation?: Maybe<ListResponseBaseOfMessages>;
  message_getConversationForUser?: Maybe<ResponseBaseOfConversations>;
  message_getUserMessages?: Maybe<ListResponseBaseOfConversationDto>;
  notification_getNotifications?: Maybe<ListResponseBaseOfNotification>;
  project_getProject?: Maybe<ResponseBaseOfProjectDto>;
  project_getProjects?: Maybe<ListResponseBaseOfProjectDto>;
  project_getQuestions?: Maybe<ListResponseBaseOfQuestion>;
  project_getUserLikeProject?: Maybe<ResponseBaseOfProjectDto>;
  project_getUserLikeProjects?: Maybe<ListResponseBaseOfProjectDto>;
  user_getAdminDashboard?: Maybe<ResponseBaseOfAdminDashboardDto>;
  user_getProfile?: Maybe<ResponseBaseOfUsers>;
  user_getUsers?: Maybe<ListResponseBaseOfUsers>;
  user_login?: Maybe<ResponseBaseOfUsers>;
};

export type QueryMessage_GetConversationArgs = {
  conversationId: Scalars['Int'];
};

export type QueryMessage_GetConversationForUserArgs = {
  otherUserId: Scalars['Int'];
};

export type QueryProject_GetProjectArgs = {
  projectId: Scalars['Int'];
};

export type QueryProject_GetProjectsArgs = {
  location?: InputMaybe<Scalars['Position']>;
  projectFilter?: InputMaybe<ProjectFilter>;
};

export type QueryProject_GetUserLikeProjectArgs = {
  projectId: Scalars['Int'];
};

export type QueryProject_GetUserLikeProjectsArgs = {
  location?: InputMaybe<Scalars['Position']>;
  projectFilter?: InputMaybe<ProjectFilter>;
};

export type QueryUser_GetProfileArgs = {
  userId?: InputMaybe<Scalars['Int']>;
};

export type Question = {
  __typename?: 'Question';
  childrenQuestions?: Maybe<Array<Maybe<Question>>>;
  createdDate: Scalars['DateTime'];
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  parentId?: Maybe<Scalars['Int']>;
  parentQuestion?: Maybe<Question>;
  project?: Maybe<Project>;
  projectId: Scalars['Int'];
  text?: Maybe<Scalars['String']>;
  user?: Maybe<Users>;
  userId: Scalars['Int'];
};

export type QuestionCollectionSegment = {
  __typename?: 'QuestionCollectionSegment';
  items?: Maybe<Array<Maybe<Question>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type QuestionFilterInput = {
  and?: InputMaybe<Array<QuestionFilterInput>>;
  childrenQuestions?: InputMaybe<ListFilterInputTypeOfQuestionFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<QuestionFilterInput>>;
  parentId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  parentQuestion?: InputMaybe<QuestionFilterInput>;
  project?: InputMaybe<ProjectFilterInput>;
  projectId?: InputMaybe<ComparableInt32OperationFilterInput>;
  text?: InputMaybe<StringOperationFilterInput>;
  user?: InputMaybe<UsersFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type QuestionInput = {
  parentId?: InputMaybe<Scalars['Int']>;
  projectId: Scalars['Int'];
  text: Scalars['String'];
};

export type QuestionSortInput = {
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  parentId?: InputMaybe<SortEnumType>;
  parentQuestion?: InputMaybe<QuestionSortInput>;
  project?: InputMaybe<ProjectSortInput>;
  projectId?: InputMaybe<SortEnumType>;
  text?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UsersSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export type ResponseBase = {
  __typename?: 'ResponseBase';
  status: ResponseStatus;
};

export type ResponseBaseOfAdminDashboardDto = {
  __typename?: 'ResponseBaseOfAdminDashboardDto';
  result?: Maybe<AdminDashboardDto>;
  status: ResponseStatus;
};

export type ResponseBaseOfBid = {
  __typename?: 'ResponseBaseOfBid';
  result?: Maybe<Bid>;
  status: ResponseStatus;
};

export type ResponseBaseOfConversations = {
  __typename?: 'ResponseBaseOfConversations';
  result?: Maybe<Conversations>;
  status: ResponseStatus;
};

export type ResponseBaseOfMessages = {
  __typename?: 'ResponseBaseOfMessages';
  result?: Maybe<Messages>;
  status: ResponseStatus;
};

export type ResponseBaseOfNotification = {
  __typename?: 'ResponseBaseOfNotification';
  result?: Maybe<Notification>;
  status: ResponseStatus;
};

export type ResponseBaseOfProject = {
  __typename?: 'ResponseBaseOfProject';
  result?: Maybe<Project>;
  status: ResponseStatus;
};

export type ResponseBaseOfProjectDto = {
  __typename?: 'ResponseBaseOfProjectDto';
  result?: Maybe<ProjectDto>;
  status: ResponseStatus;
};

export type ResponseBaseOfProjectImages = {
  __typename?: 'ResponseBaseOfProjectImages';
  result?: Maybe<ProjectImages>;
  status: ResponseStatus;
};

export type ResponseBaseOfQuestion = {
  __typename?: 'ResponseBaseOfQuestion';
  result?: Maybe<Question>;
  status: ResponseStatus;
};

export type ResponseBaseOfUserLikeProject = {
  __typename?: 'ResponseBaseOfUserLikeProject';
  result?: Maybe<UserLikeProject>;
  status: ResponseStatus;
};

export type ResponseBaseOfUsers = {
  __typename?: 'ResponseBaseOfUsers';
  result?: Maybe<Users>;
  status: ResponseStatus;
};

export enum ResponseStatus {
  AccessDenied = 'ACCESS_DENIED',
  ActiveBidsExist = 'ACTIVE_BIDS_EXIST',
  AlreadyExist = 'ALREADY_EXIST',
  AlreadyFollowed = 'ALREADY_FOLLOWED',
  AlreadyRemoved = 'ALREADY_REMOVED',
  AuthenticationFailed = 'AUTHENTICATION_FAILED',
  CommentNotFound = 'COMMENT_NOT_FOUND',
  DiffrenetIds = 'DIFFRENET_IDS',
  DurationIsRequired = 'DURATION_IS_REQUIRED',
  Failed = 'FAILED',
  HostNotFound = 'HOST_NOT_FOUND',
  InvalidTimeRange = 'INVALID_TIME_RANGE',
  InvalidTimeSyntax = 'INVALID_TIME_SYNTAX',
  InProgressBidExist = 'IN_PROGRESS_BID_EXIST',
  NotAllowed = 'NOT_ALLOWED',
  NotEnoughData = 'NOT_ENOUGH_DATA',
  NotFound = 'NOT_FOUND',
  PostNotFound = 'POST_NOT_FOUND',
  SameId = 'SAME_ID',
  SelfBidNotAllowed = 'SELF_BID_NOT_ALLOWED',
  SelfMessageNotAllowed = 'SELF_MESSAGE_NOT_ALLOWED',
  Success = 'SUCCESS',
  TimeConflict = 'TIME_CONFLICT',
  UnknownError = 'UNKNOWN_ERROR',
  UsernameAlreadyExist = 'USERNAME_ALREADY_EXIST',
  UserNotFound = 'USER_NOT_FOUND',
}

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type StringOperationFilterInput = {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  eq?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ncontains?: InputMaybe<Scalars['String']>;
  nendsWith?: InputMaybe<Scalars['String']>;
  neq?: InputMaybe<Scalars['String']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  nstartsWith?: InputMaybe<Scalars['String']>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  messageAdded?: Maybe<Messages>;
  notificationAdded?: Maybe<Notification>;
};

export type SubscriptionMessageAddedArgs = {
  userId: Scalars['Int'];
};

export type SubscriptionNotificationAddedArgs = {
  userId: Scalars['Int'];
};

export type UserInput = {
  bio?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  imageAddress?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  point: Scalars['Position'];
  state?: InputMaybe<Scalars['String']>;
  streetAddress?: InputMaybe<Scalars['String']>;
  userName?: InputMaybe<Scalars['String']>;
  zipCode?: InputMaybe<Scalars['String']>;
};

export type UserLikeProject = {
  __typename?: 'UserLikeProject';
  createdDate: Scalars['DateTime'];
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  project?: Maybe<Project>;
  projectId: Scalars['Int'];
  user?: Maybe<Users>;
  userId: Scalars['Int'];
};

export type UserLikeProjectFilterInput = {
  and?: InputMaybe<Array<UserLikeProjectFilterInput>>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<UserLikeProjectFilterInput>>;
  project?: InputMaybe<ProjectFilterInput>;
  projectId?: InputMaybe<ComparableInt32OperationFilterInput>;
  user?: InputMaybe<UsersFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export enum UserTypes {
  Admin = 'ADMIN',
  User = 'USER',
}

export type UserTypesOperationFilterInput = {
  eq?: InputMaybe<UserTypes>;
  in?: InputMaybe<Array<UserTypes>>;
  neq?: InputMaybe<UserTypes>;
  nin?: InputMaybe<Array<UserTypes>>;
};

export type Users = {
  __typename?: 'Users';
  asHuduRates: Scalars['Float'];
  asListerRates: Scalars['Float'];
  averageRate: Scalars['Float'];
  bio?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  createdDate: Scalars['DateTime'];
  email?: Maybe<Scalars['String']>;
  externalId?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  huduersWhoRatedToMeCount: Scalars['Int'];
  hudus?: Maybe<Array<Maybe<Bid>>>;
  id: Scalars['Int'];
  imageAddress?: Maybe<Scalars['String']>;
  isActive: Scalars['Boolean'];
  isDeleted: Scalars['Boolean'];
  lastName?: Maybe<Scalars['String']>;
  lastSeen: Scalars['DateTime'];
  latitude: Scalars['Float'];
  listers?: Maybe<Array<Maybe<Bid>>>;
  listersWhoRatedToMeCount: Scalars['Int'];
  longitude: Scalars['Float'];
  notifications?: Maybe<Array<Maybe<Notification>>>;
  payments?: Maybe<Array<Maybe<Payment>>>;
  projects?: Maybe<Array<Maybe<Project>>>;
  questions?: Maybe<Array<Maybe<Question>>>;
  state?: Maybe<Scalars['String']>;
  streetAddress?: Maybe<Scalars['String']>;
  userLikeProjects?: Maybe<Array<Maybe<UserLikeProject>>>;
  userName?: Maybe<Scalars['String']>;
  userTypes: UserTypes;
  zipCode?: Maybe<Scalars['String']>;
};

export type UsersCollectionSegment = {
  __typename?: 'UsersCollectionSegment';
  items?: Maybe<Array<Maybe<Users>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type UsersFilterInput = {
  and?: InputMaybe<Array<UsersFilterInput>>;
  asHuduRates?: InputMaybe<ComparableDoubleOperationFilterInput>;
  asListerRates?: InputMaybe<ComparableDoubleOperationFilterInput>;
  averageRate?: InputMaybe<ComparableDoubleOperationFilterInput>;
  bio?: InputMaybe<StringOperationFilterInput>;
  city?: InputMaybe<StringOperationFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  email?: InputMaybe<StringOperationFilterInput>;
  externalId?: InputMaybe<StringOperationFilterInput>;
  firstName?: InputMaybe<StringOperationFilterInput>;
  huduersWhoRatedToMeCount?: InputMaybe<ComparableInt32OperationFilterInput>;
  hudus?: InputMaybe<ListFilterInputTypeOfBidFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  imageAddress?: InputMaybe<StringOperationFilterInput>;
  isActive?: InputMaybe<BooleanOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastName?: InputMaybe<StringOperationFilterInput>;
  lastSeen?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  latitude?: InputMaybe<ComparableDoubleOperationFilterInput>;
  listers?: InputMaybe<ListFilterInputTypeOfBidFilterInput>;
  listersWhoRatedToMeCount?: InputMaybe<ComparableInt32OperationFilterInput>;
  longitude?: InputMaybe<ComparableDoubleOperationFilterInput>;
  notifications?: InputMaybe<ListFilterInputTypeOfNotificationFilterInput>;
  or?: InputMaybe<Array<UsersFilterInput>>;
  payments?: InputMaybe<ListFilterInputTypeOfPaymentFilterInput>;
  projects?: InputMaybe<ListFilterInputTypeOfProjectFilterInput>;
  questions?: InputMaybe<ListFilterInputTypeOfQuestionFilterInput>;
  state?: InputMaybe<StringOperationFilterInput>;
  streetAddress?: InputMaybe<StringOperationFilterInput>;
  userLikeProjects?: InputMaybe<ListFilterInputTypeOfUserLikeProjectFilterInput>;
  userName?: InputMaybe<StringOperationFilterInput>;
  userTypes?: InputMaybe<UserTypesOperationFilterInput>;
  zipCode?: InputMaybe<StringOperationFilterInput>;
};

export type UsersSortInput = {
  asHuduRates?: InputMaybe<SortEnumType>;
  asListerRates?: InputMaybe<SortEnumType>;
  averageRate?: InputMaybe<SortEnumType>;
  bio?: InputMaybe<SortEnumType>;
  city?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  email?: InputMaybe<SortEnumType>;
  externalId?: InputMaybe<SortEnumType>;
  firstName?: InputMaybe<SortEnumType>;
  huduersWhoRatedToMeCount?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  imageAddress?: InputMaybe<SortEnumType>;
  isActive?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastName?: InputMaybe<SortEnumType>;
  lastSeen?: InputMaybe<SortEnumType>;
  latitude?: InputMaybe<SortEnumType>;
  listersWhoRatedToMeCount?: InputMaybe<SortEnumType>;
  longitude?: InputMaybe<SortEnumType>;
  state?: InputMaybe<SortEnumType>;
  streetAddress?: InputMaybe<SortEnumType>;
  userName?: InputMaybe<SortEnumType>;
  userTypes?: InputMaybe<SortEnumType>;
  zipCode?: InputMaybe<SortEnumType>;
};

export type Bid_AcceptBidMutationVariables = Exact<{
  bidId: Scalars['Int'];
}>;

export type Bid_AcceptBidMutation = {
  __typename?: 'Mutation';
  bid_acceptBid?: {
    __typename?: 'ResponseBaseOfBid';
    status: ResponseStatus;
    result?: {
      __typename?: 'Bid';
      bidStatus: BidStatus;
      amount: number;
      description?: string | null;
      hudusComment?: string | null;
      hudusRate?: string | null;
      isHuduCommented: boolean;
      listersComment?: string | null;
      listersRate?: string | null;
      isListerCommented: boolean;
      huduId: number;
      listerId: number;
      projectId: number;
      id: number;
      isDeleted: boolean;
      createdDate: any;
      hudu?: {
        __typename?: 'Users';
        email?: string | null;
        userName?: string | null;
        lastSeen: any;
        userTypes: UserTypes;
        imageAddress?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        bio?: string | null;
        streetAddress?: string | null;
        city?: string | null;
        state?: string | null;
        isActive: boolean;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
        asHuduRates: number;
        listersWhoRatedToMeCount: number;
        asListerRates: number;
        huduersWhoRatedToMeCount: number;
        averageRate: number;
        externalId?: string | null;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null;
      lister?: {
        __typename?: 'Users';
        email?: string | null;
        userName?: string | null;
        lastSeen: any;
        userTypes: UserTypes;
        imageAddress?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        bio?: string | null;
        streetAddress?: string | null;
        city?: string | null;
        state?: string | null;
        isActive: boolean;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
        asHuduRates: number;
        listersWhoRatedToMeCount: number;
        asListerRates: number;
        huduersWhoRatedToMeCount: number;
        averageRate: number;
        externalId?: string | null;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null;
      project?: {
        __typename?: 'Project';
        projectStatus: ProjectStatus;
        title?: string | null;
        description?: string | null;
        duration: number;
        availability: Availability;
        streetAddress?: string | null;
        city?: string | null;
        state?: string | null;
        projectDeadLine: any;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null;
      payments?: Array<{
        __typename?: 'Payment';
        amount: number;
        intentId?: string | null;
        intentStatus?: string | null;
        clientSecret?: string | null;
        bidId: number;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
    } | null;
  } | null;
};

export type Bid_AddBidMutationVariables = Exact<{
  bidInput?: InputMaybe<BidInput>;
}>;

export type Bid_AddBidMutation = {
  __typename?: 'Mutation';
  bid_addBid?: {
    __typename?: 'ResponseBaseOfBid';
    status: ResponseStatus;
    result?: {
      __typename?: 'Bid';
      bidStatus: BidStatus;
      amount: number;
      description?: string | null;
      hudusComment?: string | null;
      hudusRate?: string | null;
      isHuduCommented: boolean;
      listersComment?: string | null;
      listersRate?: string | null;
      isListerCommented: boolean;
      huduId: number;
      listerId: number;
      projectId: number;
      id: number;
      isDeleted: boolean;
      createdDate: any;
      hudu?: {
        __typename?: 'Users';
        email?: string | null;
        userName?: string | null;
        lastSeen: any;
        userTypes: UserTypes;
        imageAddress?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        bio?: string | null;
        streetAddress?: string | null;
        city?: string | null;
        state?: string | null;
        isActive: boolean;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
        asHuduRates: number;
        listersWhoRatedToMeCount: number;
        asListerRates: number;
        huduersWhoRatedToMeCount: number;
        averageRate: number;
        externalId?: string | null;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null;
      lister?: {
        __typename?: 'Users';
        email?: string | null;
        userName?: string | null;
        lastSeen: any;
        userTypes: UserTypes;
        imageAddress?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        bio?: string | null;
        streetAddress?: string | null;
        city?: string | null;
        state?: string | null;
        isActive: boolean;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
        asHuduRates: number;
        listersWhoRatedToMeCount: number;
        asListerRates: number;
        huduersWhoRatedToMeCount: number;
        averageRate: number;
        externalId?: string | null;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null;
      project?: {
        __typename?: 'Project';
        projectStatus: ProjectStatus;
        title?: string | null;
        description?: string | null;
        duration: number;
        availability: Availability;
        streetAddress?: string | null;
        city?: string | null;
        state?: string | null;
        projectDeadLine: any;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null;
      payments?: Array<{
        __typename?: 'Payment';
        amount: number;
        intentId?: string | null;
        intentStatus?: string | null;
        clientSecret?: string | null;
        bidId: number;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
    } | null;
  } | null;
};

export type Bid_CancellBidMutationVariables = Exact<{
  bidId: Scalars['Int'];
}>;

export type Bid_CancellBidMutation = {
  __typename?: 'Mutation';
  bid_cancellBid?: {
    __typename?: 'ResponseBaseOfBid';
    status: ResponseStatus;
    result?: {
      __typename?: 'Bid';
      bidStatus: BidStatus;
      amount: number;
      description?: string | null;
      hudusComment?: string | null;
      hudusRate?: string | null;
      isHuduCommented: boolean;
      listersComment?: string | null;
      listersRate?: string | null;
      isListerCommented: boolean;
      huduId: number;
      listerId: number;
      projectId: number;
      id: number;
      isDeleted: boolean;
      createdDate: any;
      hudu?: {
        __typename?: 'Users';
        email?: string | null;
        userName?: string | null;
        lastSeen: any;
        userTypes: UserTypes;
        imageAddress?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        bio?: string | null;
        streetAddress?: string | null;
        city?: string | null;
        state?: string | null;
        isActive: boolean;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
        asHuduRates: number;
        listersWhoRatedToMeCount: number;
        asListerRates: number;
        huduersWhoRatedToMeCount: number;
        averageRate: number;
        externalId?: string | null;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null;
      lister?: {
        __typename?: 'Users';
        email?: string | null;
        userName?: string | null;
        lastSeen: any;
        userTypes: UserTypes;
        imageAddress?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        bio?: string | null;
        streetAddress?: string | null;
        city?: string | null;
        state?: string | null;
        isActive: boolean;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
        asHuduRates: number;
        listersWhoRatedToMeCount: number;
        asListerRates: number;
        huduersWhoRatedToMeCount: number;
        averageRate: number;
        externalId?: string | null;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null;
      project?: {
        __typename?: 'Project';
        projectStatus: ProjectStatus;
        title?: string | null;
        description?: string | null;
        duration: number;
        availability: Availability;
        streetAddress?: string | null;
        city?: string | null;
        state?: string | null;
        projectDeadLine: any;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null;
      payments?: Array<{
        __typename?: 'Payment';
        amount: number;
        intentId?: string | null;
        intentStatus?: string | null;
        clientSecret?: string | null;
        bidId: number;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
    } | null;
  } | null;
};

export type Bid_DeleteBidMutationVariables = Exact<{
  bidId: Scalars['Int'];
}>;

export type Bid_DeleteBidMutation = {
  __typename?: 'Mutation';
  bid_deleteBid?: {
    __typename?: 'ResponseBaseOfBid';
    status: ResponseStatus;
    result?: {
      __typename?: 'Bid';
      bidStatus: BidStatus;
      amount: number;
      description?: string | null;
      hudusComment?: string | null;
      hudusRate?: string | null;
      isHuduCommented: boolean;
      listersComment?: string | null;
      listersRate?: string | null;
      isListerCommented: boolean;
      huduId: number;
      listerId: number;
      projectId: number;
      id: number;
      isDeleted: boolean;
      createdDate: any;
      hudu?: {
        __typename?: 'Users';
        email?: string | null;
        userName?: string | null;
        lastSeen: any;
        userTypes: UserTypes;
        imageAddress?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        bio?: string | null;
        streetAddress?: string | null;
        city?: string | null;
        state?: string | null;
        isActive: boolean;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
        asHuduRates: number;
        listersWhoRatedToMeCount: number;
        asListerRates: number;
        huduersWhoRatedToMeCount: number;
        averageRate: number;
        externalId?: string | null;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null;
      lister?: {
        __typename?: 'Users';
        email?: string | null;
        userName?: string | null;
        lastSeen: any;
        userTypes: UserTypes;
        imageAddress?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        bio?: string | null;
        streetAddress?: string | null;
        city?: string | null;
        state?: string | null;
        isActive: boolean;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
        asHuduRates: number;
        listersWhoRatedToMeCount: number;
        asListerRates: number;
        huduersWhoRatedToMeCount: number;
        averageRate: number;
        externalId?: string | null;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null;
      project?: {
        __typename?: 'Project';
        projectStatus: ProjectStatus;
        title?: string | null;
        description?: string | null;
        duration: number;
        availability: Availability;
        streetAddress?: string | null;
        city?: string | null;
        state?: string | null;
        projectDeadLine: any;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null;
      payments?: Array<{
        __typename?: 'Payment';
        amount: number;
        intentId?: string | null;
        intentStatus?: string | null;
        clientSecret?: string | null;
        bidId: number;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
    } | null;
  } | null;
};

export type Bid_EditBidMutationVariables = Exact<{
  editBidInput?: InputMaybe<EditBidInput>;
}>;

export type Bid_EditBidMutation = {
  __typename?: 'Mutation';
  bid_editBid?: {
    __typename?: 'ResponseBaseOfBid';
    status: ResponseStatus;
    result?: {
      __typename?: 'Bid';
      bidStatus: BidStatus;
      amount: number;
      description?: string | null;
      hudusComment?: string | null;
      hudusRate?: string | null;
      isHuduCommented: boolean;
      listersComment?: string | null;
      listersRate?: string | null;
      isListerCommented: boolean;
      huduId: number;
      listerId: number;
      projectId: number;
      id: number;
      isDeleted: boolean;
      createdDate: any;
      hudu?: {
        __typename?: 'Users';
        email?: string | null;
        userName?: string | null;
        lastSeen: any;
        userTypes: UserTypes;
        imageAddress?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        bio?: string | null;
        streetAddress?: string | null;
        city?: string | null;
        state?: string | null;
        isActive: boolean;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
        asHuduRates: number;
        listersWhoRatedToMeCount: number;
        asListerRates: number;
        huduersWhoRatedToMeCount: number;
        averageRate: number;
        externalId?: string | null;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null;
      lister?: {
        __typename?: 'Users';
        email?: string | null;
        userName?: string | null;
        lastSeen: any;
        userTypes: UserTypes;
        imageAddress?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        bio?: string | null;
        streetAddress?: string | null;
        city?: string | null;
        state?: string | null;
        isActive: boolean;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
        asHuduRates: number;
        listersWhoRatedToMeCount: number;
        asListerRates: number;
        huduersWhoRatedToMeCount: number;
        averageRate: number;
        externalId?: string | null;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null;
      project?: {
        __typename?: 'Project';
        projectStatus: ProjectStatus;
        title?: string | null;
        description?: string | null;
        duration: number;
        availability: Availability;
        streetAddress?: string | null;
        city?: string | null;
        state?: string | null;
        projectDeadLine: any;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null;
      payments?: Array<{
        __typename?: 'Payment';
        amount: number;
        intentId?: string | null;
        intentStatus?: string | null;
        clientSecret?: string | null;
        bidId: number;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
    } | null;
  } | null;
};

export type Bid_RejectBidMutationVariables = Exact<{
  bidId: Scalars['Int'];
}>;

export type Bid_RejectBidMutation = {
  __typename?: 'Mutation';
  bid_rejectBid?: {
    __typename?: 'ResponseBaseOfBid';
    status: ResponseStatus;
    result?: {
      __typename?: 'Bid';
      bidStatus: BidStatus;
      amount: number;
      description?: string | null;
      hudusComment?: string | null;
      hudusRate?: string | null;
      isHuduCommented: boolean;
      listersComment?: string | null;
      listersRate?: string | null;
      isListerCommented: boolean;
      huduId: number;
      listerId: number;
      projectId: number;
      id: number;
      isDeleted: boolean;
      createdDate: any;
      hudu?: {
        __typename?: 'Users';
        email?: string | null;
        userName?: string | null;
        lastSeen: any;
        userTypes: UserTypes;
        imageAddress?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        bio?: string | null;
        streetAddress?: string | null;
        city?: string | null;
        state?: string | null;
        isActive: boolean;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
        asHuduRates: number;
        listersWhoRatedToMeCount: number;
        asListerRates: number;
        huduersWhoRatedToMeCount: number;
        averageRate: number;
        externalId?: string | null;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null;
      lister?: {
        __typename?: 'Users';
        email?: string | null;
        userName?: string | null;
        lastSeen: any;
        userTypes: UserTypes;
        imageAddress?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        bio?: string | null;
        streetAddress?: string | null;
        city?: string | null;
        state?: string | null;
        isActive: boolean;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
        asHuduRates: number;
        listersWhoRatedToMeCount: number;
        asListerRates: number;
        huduersWhoRatedToMeCount: number;
        averageRate: number;
        externalId?: string | null;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null;
      project?: {
        __typename?: 'Project';
        projectStatus: ProjectStatus;
        title?: string | null;
        description?: string | null;
        duration: number;
        availability: Availability;
        streetAddress?: string | null;
        city?: string | null;
        state?: string | null;
        projectDeadLine: any;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null;
      payments?: Array<{
        __typename?: 'Payment';
        amount: number;
        intentId?: string | null;
        intentStatus?: string | null;
        clientSecret?: string | null;
        bidId: number;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
    } | null;
  } | null;
};

export type Bid_GetBidsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BidFilterInput>;
  order?: InputMaybe<Array<BidSortInput> | BidSortInput>;
}>;

export type Bid_GetBidsQuery = {
  __typename?: 'Query';
  bid_getBids?: {
    __typename?: 'ListResponseBaseOfBid';
    status: ResponseStatus;
    result?: {
      __typename?: 'BidCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'Bid';
        bidStatus: BidStatus;
        amount: number;
        description?: string | null;
        hudusComment?: string | null;
        hudusRate?: string | null;
        isHuduCommented: boolean;
        listersComment?: string | null;
        listersRate?: string | null;
        isListerCommented: boolean;
        huduId: number;
        listerId: number;
        projectId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
        lister?: {
          __typename?: 'Users';
          userName?: string | null;
          firstName?: string | null;
          lastName?: string | null;
          id: number;
        } | null;
        hudu?: {
          __typename?: 'Users';
          userName?: string | null;
          imageAddress?: string | null;
          averageRate: number;
          listersWhoRatedToMeCount: number;
          huduersWhoRatedToMeCount: number;
          id: number;
        } | null;
        project?: {
          __typename?: 'Project';
          projectStatus: ProjectStatus;
          title?: string | null;
          description?: string | null;
          bids?: Array<{
            __typename?: 'Bid';
            amount: number;
            id: number;
            huduId: number;
          } | null> | null;
          projectImages?: Array<{
            __typename?: 'ProjectImages';
            imageAddress?: string | null;
          } | null> | null;
        } | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Message_CreateMessageMutationVariables = Exact<{
  messageInput?: InputMaybe<MessageInput>;
}>;

export type Message_CreateMessageMutation = {
  __typename?: 'Mutation';
  message_createMessage?: {
    __typename?: 'ResponseBaseOfMessages';
    status: ResponseStatus;
    result?: {
      __typename?: 'Messages';
      createdAt: any;
      conversationId: number;
      senderId: number;
      text?: string | null;
      id: number;
      isDeleted: boolean;
      createdDate: any;
      conversation?: {
        __typename?: 'Conversations';
        subject?: string | null;
        firstUserId: number;
        secondUserId: number;
        firstUnreadCount: number;
        secondUnreadCount: number;
        latestMessageDate: any;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null;
      sender?: {
        __typename?: 'Users';
        email?: string | null;
        userName?: string | null;
        lastSeen: any;
        userTypes: UserTypes;
        imageAddress?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        bio?: string | null;
        streetAddress?: string | null;
        city?: string | null;
        state?: string | null;
        isActive: boolean;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
        asHuduRates: number;
        listersWhoRatedToMeCount: number;
        asListerRates: number;
        huduersWhoRatedToMeCount: number;
        averageRate: number;
        externalId?: string | null;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null;
    } | null;
  } | null;
};

export type Message_DeleteMessageMutationVariables = Exact<{
  messageId: Scalars['Int'];
}>;

export type Message_DeleteMessageMutation = {
  __typename?: 'Mutation';
  message_deleteMessage?: {
    __typename?: 'ResponseBaseOfMessages';
    status: ResponseStatus;
    result?: {
      __typename?: 'Messages';
      createdAt: any;
      conversationId: number;
      senderId: number;
      text?: string | null;
      id: number;
      isDeleted: boolean;
      createdDate: any;
      conversation?: {
        __typename?: 'Conversations';
        subject?: string | null;
        firstUserId: number;
        secondUserId: number;
        firstUnreadCount: number;
        secondUnreadCount: number;
        latestMessageDate: any;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null;
      sender?: {
        __typename?: 'Users';
        email?: string | null;
        userName?: string | null;
        lastSeen: any;
        userTypes: UserTypes;
        imageAddress?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        bio?: string | null;
        streetAddress?: string | null;
        city?: string | null;
        state?: string | null;
        isActive: boolean;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
        asHuduRates: number;
        listersWhoRatedToMeCount: number;
        asListerRates: number;
        huduersWhoRatedToMeCount: number;
        averageRate: number;
        externalId?: string | null;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null;
    } | null;
  } | null;
};

export type Message_RemoveConversationMutationVariables = Exact<{
  conversationId: Scalars['Int'];
}>;

export type Message_RemoveConversationMutation = {
  __typename?: 'Mutation';
  message_removeConversation?: {
    __typename?: 'ResponseBase';
    status: ResponseStatus;
  } | null;
};

export type Message_GetConversationQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<MessagesFilterInput>;
  order?: InputMaybe<Array<MessagesSortInput> | MessagesSortInput>;
  conversationId: Scalars['Int'];
}>;

export type Message_GetConversationQuery = {
  __typename?: 'Query';
  message_getConversation?: {
    __typename?: 'ListResponseBaseOfMessages';
    status: ResponseStatus;
    result?: {
      __typename?: 'MessagesCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'Messages';
        createdAt: any;
        conversationId: number;
        senderId: number;
        text?: string | null;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Message_GetUserMessagesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ConversationDtoFilterInput>;
  order?: InputMaybe<
    Array<ConversationDtoSortInput> | ConversationDtoSortInput
  >;
}>;

export type Message_GetUserMessagesQuery = {
  __typename?: 'Query';
  message_getUserMessages?: {
    __typename?: 'ListResponseBaseOfConversationDto';
    status: ResponseStatus;
    result?: {
      __typename?: 'ConversationDtoCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'ConversationDto';
        subject?: string | null;
        conversationId: number;
        unreadCount: number;
        latestMessageDate: any;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Notification_AddNotificationMutationVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<NotificationFilterInput>;
  order?: InputMaybe<Array<NotificationSortInput> | NotificationSortInput>;
  notifications?: InputMaybe<
    | Array<InputMaybe<NotificationInputsInput>>
    | InputMaybe<NotificationInputsInput>
  >;
}>;

export type Notification_AddNotificationMutation = {
  __typename?: 'Mutation';
  notification_addNotification?: {
    __typename?: 'ListResponseBaseOfNotification';
    status: ResponseStatus;
    result?: {
      __typename?: 'NotificationCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'Notification';
        title?: string | null;
        description?: string | null;
        isReaded: boolean;
        notificationType: NotificationType;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Notification_ReadNotificationMutationVariables = Exact<{
  notificationId: Scalars['Int'];
}>;

export type Notification_ReadNotificationMutation = {
  __typename?: 'Mutation';
  notification_readNotification?: {
    __typename?: 'ResponseBaseOfNotification';
    status: ResponseStatus;
    result?: {
      __typename?: 'Notification';
      title?: string | null;
      description?: string | null;
      isReaded: boolean;
      notificationType: NotificationType;
      userId: number;
      id: number;
      isDeleted: boolean;
      createdDate: any;
      user?: {
        __typename?: 'Users';
        email?: string | null;
        userName?: string | null;
        lastSeen: any;
        userTypes: UserTypes;
        imageAddress?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        bio?: string | null;
        streetAddress?: string | null;
        city?: string | null;
        state?: string | null;
        isActive: boolean;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
        asHuduRates: number;
        listersWhoRatedToMeCount: number;
        asListerRates: number;
        huduersWhoRatedToMeCount: number;
        averageRate: number;
        externalId?: string | null;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null;
    } | null;
  } | null;
};

export type Notification_GetNotificationsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<NotificationFilterInput>;
  order?: InputMaybe<Array<NotificationSortInput> | NotificationSortInput>;
}>;

export type Notification_GetNotificationsQuery = {
  __typename?: 'Query';
  notification_getNotifications?: {
    __typename?: 'ListResponseBaseOfNotification';
    status: ResponseStatus;
    result?: {
      __typename?: 'NotificationCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'Notification';
        title?: string | null;
        description?: string | null;
        isReaded: boolean;
        notificationType: NotificationType;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type NotificationAddedSubscriptionVariables = Exact<{
  userId: Scalars['Int'];
}>;

export type NotificationAddedSubscription = {
  __typename?: 'Subscription';
  notificationAdded?: {
    __typename?: 'Notification';
    title?: string | null;
    description?: string | null;
    isReaded: boolean;
    notificationType: NotificationType;
    userId: number;
    id: number;
    isDeleted: boolean;
    createdDate: any;
    user?: {
      __typename?: 'Users';
      email?: string | null;
      userName?: string | null;
      lastSeen: any;
      userTypes: UserTypes;
      imageAddress?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      bio?: string | null;
      streetAddress?: string | null;
      city?: string | null;
      state?: string | null;
      isActive: boolean;
      longitude: number;
      latitude: number;
      zipCode?: string | null;
      asHuduRates: number;
      listersWhoRatedToMeCount: number;
      asListerRates: number;
      huduersWhoRatedToMeCount: number;
      averageRate: number;
      externalId?: string | null;
      id: number;
      isDeleted: boolean;
      createdDate: any;
      payments?: Array<{
        __typename?: 'Payment';
        amount: number;
        intentId?: string | null;
        intentStatus?: string | null;
        clientSecret?: string | null;
        bidId: number;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
      userLikeProjects?: Array<{
        __typename?: 'UserLikeProject';
        projectId: number;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
      projects?: Array<{
        __typename?: 'Project';
        projectStatus: ProjectStatus;
        title?: string | null;
        description?: string | null;
        duration: number;
        availability: Availability;
        streetAddress?: string | null;
        city?: string | null;
        state?: string | null;
        projectDeadLine: any;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
      notifications?: Array<{
        __typename?: 'Notification';
        title?: string | null;
        description?: string | null;
        isReaded: boolean;
        notificationType: NotificationType;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
      questions?: Array<{
        __typename?: 'Question';
        text?: string | null;
        parentId?: number | null;
        projectId: number;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
      hudus?: Array<{
        __typename?: 'Bid';
        bidStatus: BidStatus;
        amount: number;
        description?: string | null;
        hudusComment?: string | null;
        hudusRate?: string | null;
        isHuduCommented: boolean;
        listersComment?: string | null;
        listersRate?: string | null;
        isListerCommented: boolean;
        huduId: number;
        listerId: number;
        projectId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
      listers?: Array<{
        __typename?: 'Bid';
        bidStatus: BidStatus;
        amount: number;
        description?: string | null;
        hudusComment?: string | null;
        hudusRate?: string | null;
        isHuduCommented: boolean;
        listersComment?: string | null;
        listersRate?: string | null;
        isListerCommented: boolean;
        huduId: number;
        listerId: number;
        projectId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
    } | null;
  } | null;
};

export type Project_AddFeedBackMutationVariables = Exact<{
  feedbackInput?: InputMaybe<FeedbackInput>;
}>;

export type Project_AddFeedBackMutation = {
  __typename?: 'Mutation';
  project_addFeedBack?: {
    __typename?: 'ResponseBaseOfBid';
    status: ResponseStatus;
    result?: {
      __typename?: 'Bid';
      bidStatus: BidStatus;
      amount: number;
      description?: string | null;
      hudusComment?: string | null;
      hudusRate?: string | null;
      isHuduCommented: boolean;
      listersComment?: string | null;
      listersRate?: string | null;
      isListerCommented: boolean;
      huduId: number;
      listerId: number;
      projectId: number;
      id: number;
      isDeleted: boolean;
      createdDate: any;
      hudu?: {
        __typename?: 'Users';
        email?: string | null;
        userName?: string | null;
        lastSeen: any;
        userTypes: UserTypes;
        imageAddress?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        bio?: string | null;
        streetAddress?: string | null;
        city?: string | null;
        state?: string | null;
        isActive: boolean;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
        asHuduRates: number;
        listersWhoRatedToMeCount: number;
        asListerRates: number;
        huduersWhoRatedToMeCount: number;
        averageRate: number;
        externalId?: string | null;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null;
      lister?: {
        __typename?: 'Users';
        email?: string | null;
        userName?: string | null;
        lastSeen: any;
        userTypes: UserTypes;
        imageAddress?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        bio?: string | null;
        streetAddress?: string | null;
        city?: string | null;
        state?: string | null;
        isActive: boolean;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
        asHuduRates: number;
        listersWhoRatedToMeCount: number;
        asListerRates: number;
        huduersWhoRatedToMeCount: number;
        averageRate: number;
        externalId?: string | null;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null;
      project?: {
        __typename?: 'Project';
        projectStatus: ProjectStatus;
        title?: string | null;
        description?: string | null;
        duration: number;
        availability: Availability;
        streetAddress?: string | null;
        city?: string | null;
        state?: string | null;
        projectDeadLine: any;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null;
      payments?: Array<{
        __typename?: 'Payment';
        amount: number;
        intentId?: string | null;
        intentStatus?: string | null;
        clientSecret?: string | null;
        bidId: number;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
    } | null;
  } | null;
};

export type Project_AddProjectMutationVariables = Exact<{
  addProjectInput?: InputMaybe<AddProjectInput>;
}>;

export type Project_AddProjectMutation = {
  __typename?: 'Mutation';
  project_addProject?: {
    __typename?: 'ResponseBaseOfProject';
    status: ResponseStatus;
    result?: {
      __typename?: 'Project';
      projectStatus: ProjectStatus;
      title?: string | null;
      description?: string | null;
      duration: number;
      availability: Availability;
      streetAddress?: string | null;
      city?: string | null;
      state?: string | null;
      projectDeadLine: any;
      longitude: number;
      latitude: number;
      zipCode?: string | null;
      userId: number;
      id: number;
      isDeleted: boolean;
      createdDate: any;
      bids?: Array<{
        __typename?: 'Bid';
        bidStatus: BidStatus;
        amount: number;
        description?: string | null;
        hudusComment?: string | null;
        hudusRate?: string | null;
        isHuduCommented: boolean;
        listersComment?: string | null;
        listersRate?: string | null;
        isListerCommented: boolean;
        huduId: number;
        listerId: number;
        projectId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
      questions?: Array<{
        __typename?: 'Question';
        text?: string | null;
        parentId?: number | null;
        projectId: number;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
      projectImages?: Array<{
        __typename?: 'ProjectImages';
        imageAddress?: string | null;
        projectId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
      userLikeProjects?: Array<{
        __typename?: 'UserLikeProject';
        projectId: number;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
      user?: {
        __typename?: 'Users';
        email?: string | null;
        userName?: string | null;
        lastSeen: any;
        userTypes: UserTypes;
        imageAddress?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        bio?: string | null;
        streetAddress?: string | null;
        city?: string | null;
        state?: string | null;
        isActive: boolean;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
        asHuduRates: number;
        listersWhoRatedToMeCount: number;
        asListerRates: number;
        huduersWhoRatedToMeCount: number;
        averageRate: number;
        externalId?: string | null;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null;
    } | null;
  } | null;
};

export type Project_AddImageToProjectMutationVariables = Exact<{
  imageAddress?: InputMaybe<Scalars['String']>;
  projectId: Scalars['Int'];
}>;

export type Project_AddImageToProjectMutation = {
  __typename?: 'Mutation';
  project_addImageToProject?: {
    __typename?: 'ResponseBaseOfProjectImages';
    status: ResponseStatus;
    result?: {
      __typename?: 'ProjectImages';
      imageAddress?: string | null;
      projectId: number;
      id: number;
      isDeleted: boolean;
      createdDate: any;
      project?: {
        __typename?: 'Project';
        projectStatus: ProjectStatus;
        title?: string | null;
        description?: string | null;
        duration: number;
        availability: Availability;
        streetAddress?: string | null;
        city?: string | null;
        state?: string | null;
        projectDeadLine: any;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null;
    } | null;
  } | null;
};

export type Project_AddQuestionMutationVariables = Exact<{
  questionInput?: InputMaybe<QuestionInput>;
}>;

export type Project_AddQuestionMutation = {
  __typename?: 'Mutation';
  project_addQuestion?: {
    __typename?: 'ResponseBaseOfQuestion';
    status: ResponseStatus;
    result?: {
      __typename?: 'Question';
      text?: string | null;
      parentId?: number | null;
      projectId: number;
      userId: number;
      id: number;
      isDeleted: boolean;
      createdDate: any;
      parentQuestion?: {
        __typename?: 'Question';
        text?: string | null;
        parentId?: number | null;
        projectId: number;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null;
      childrenQuestions?: Array<{
        __typename?: 'Question';
        text?: string | null;
        parentId?: number | null;
        projectId: number;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
      project?: {
        __typename?: 'Project';
        projectStatus: ProjectStatus;
        title?: string | null;
        description?: string | null;
        duration: number;
        availability: Availability;
        streetAddress?: string | null;
        city?: string | null;
        state?: string | null;
        projectDeadLine: any;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null;
      user?: {
        __typename?: 'Users';
        email?: string | null;
        userName?: string | null;
        lastSeen: any;
        userTypes: UserTypes;
        imageAddress?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        bio?: string | null;
        streetAddress?: string | null;
        city?: string | null;
        state?: string | null;
        isActive: boolean;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
        asHuduRates: number;
        listersWhoRatedToMeCount: number;
        asListerRates: number;
        huduersWhoRatedToMeCount: number;
        averageRate: number;
        externalId?: string | null;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null;
    } | null;
  } | null;
};

export type Project_EditProjectMutationVariables = Exact<{
  editProjectInput?: InputMaybe<EditProjectInput>;
}>;

export type Project_EditProjectMutation = {
  __typename?: 'Mutation';
  project_editProject?: {
    __typename?: 'ResponseBaseOfProject';
    status: ResponseStatus;
    result?: {
      __typename?: 'Project';
      projectStatus: ProjectStatus;
      title?: string | null;
      description?: string | null;
      duration: number;
      availability: Availability;
      streetAddress?: string | null;
      city?: string | null;
      state?: string | null;
      projectDeadLine: any;
      longitude: number;
      latitude: number;
      zipCode?: string | null;
      userId: number;
      id: number;
      isDeleted: boolean;
      createdDate: any;
      bids?: Array<{
        __typename?: 'Bid';
        bidStatus: BidStatus;
        amount: number;
        description?: string | null;
        hudusComment?: string | null;
        hudusRate?: string | null;
        isHuduCommented: boolean;
        listersComment?: string | null;
        listersRate?: string | null;
        isListerCommented: boolean;
        huduId: number;
        listerId: number;
        projectId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
      questions?: Array<{
        __typename?: 'Question';
        text?: string | null;
        parentId?: number | null;
        projectId: number;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
      projectImages?: Array<{
        __typename?: 'ProjectImages';
        imageAddress?: string | null;
        projectId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
      userLikeProjects?: Array<{
        __typename?: 'UserLikeProject';
        projectId: number;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
      user?: {
        __typename?: 'Users';
        email?: string | null;
        userName?: string | null;
        lastSeen: any;
        userTypes: UserTypes;
        imageAddress?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        bio?: string | null;
        streetAddress?: string | null;
        city?: string | null;
        state?: string | null;
        isActive: boolean;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
        asHuduRates: number;
        listersWhoRatedToMeCount: number;
        asListerRates: number;
        huduersWhoRatedToMeCount: number;
        averageRate: number;
        externalId?: string | null;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null;
    } | null;
  } | null;
};

export type Project_FaileProjectMutationVariables = Exact<{
  projectId: Scalars['Int'];
}>;

export type Project_FaileProjectMutation = {
  __typename?: 'Mutation';
  project_faileProject?: {
    __typename?: 'ResponseBaseOfProject';
    status: ResponseStatus;
    result?: {
      __typename?: 'Project';
      projectStatus: ProjectStatus;
      title?: string | null;
      description?: string | null;
      duration: number;
      availability: Availability;
      streetAddress?: string | null;
      city?: string | null;
      state?: string | null;
      projectDeadLine: any;
      longitude: number;
      latitude: number;
      zipCode?: string | null;
      userId: number;
      id: number;
      isDeleted: boolean;
      createdDate: any;
      bids?: Array<{
        __typename?: 'Bid';
        bidStatus: BidStatus;
        amount: number;
        description?: string | null;
        hudusComment?: string | null;
        hudusRate?: string | null;
        isHuduCommented: boolean;
        listersComment?: string | null;
        listersRate?: string | null;
        isListerCommented: boolean;
        huduId: number;
        listerId: number;
        projectId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
      questions?: Array<{
        __typename?: 'Question';
        text?: string | null;
        parentId?: number | null;
        projectId: number;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
      projectImages?: Array<{
        __typename?: 'ProjectImages';
        imageAddress?: string | null;
        projectId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
      userLikeProjects?: Array<{
        __typename?: 'UserLikeProject';
        projectId: number;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
      user?: {
        __typename?: 'Users';
        email?: string | null;
        userName?: string | null;
        lastSeen: any;
        userTypes: UserTypes;
        imageAddress?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        bio?: string | null;
        streetAddress?: string | null;
        city?: string | null;
        state?: string | null;
        isActive: boolean;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
        asHuduRates: number;
        listersWhoRatedToMeCount: number;
        asListerRates: number;
        huduersWhoRatedToMeCount: number;
        averageRate: number;
        externalId?: string | null;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null;
    } | null;
  } | null;
};

export type Project_FinisheProjectMutationVariables = Exact<{
  projectId: Scalars['Int'];
}>;

export type Project_FinisheProjectMutation = {
  __typename?: 'Mutation';
  project_finisheProject?: {
    __typename?: 'ResponseBaseOfProject';
    status: ResponseStatus;
    result?: {
      __typename?: 'Project';
      projectStatus: ProjectStatus;
      title?: string | null;
      description?: string | null;
      duration: number;
      availability: Availability;
      streetAddress?: string | null;
      city?: string | null;
      state?: string | null;
      projectDeadLine: any;
      longitude: number;
      latitude: number;
      zipCode?: string | null;
      userId: number;
      id: number;
      isDeleted: boolean;
      createdDate: any;
      bids?: Array<{
        __typename?: 'Bid';
        bidStatus: BidStatus;
        amount: number;
        description?: string | null;
        hudusComment?: string | null;
        hudusRate?: string | null;
        isHuduCommented: boolean;
        listersComment?: string | null;
        listersRate?: string | null;
        isListerCommented: boolean;
        huduId: number;
        listerId: number;
        projectId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
      questions?: Array<{
        __typename?: 'Question';
        text?: string | null;
        parentId?: number | null;
        projectId: number;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
      projectImages?: Array<{
        __typename?: 'ProjectImages';
        imageAddress?: string | null;
        projectId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
      userLikeProjects?: Array<{
        __typename?: 'UserLikeProject';
        projectId: number;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
      user?: {
        __typename?: 'Users';
        email?: string | null;
        userName?: string | null;
        lastSeen: any;
        userTypes: UserTypes;
        imageAddress?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        bio?: string | null;
        streetAddress?: string | null;
        city?: string | null;
        state?: string | null;
        isActive: boolean;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
        asHuduRates: number;
        listersWhoRatedToMeCount: number;
        asListerRates: number;
        huduersWhoRatedToMeCount: number;
        averageRate: number;
        externalId?: string | null;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null;
    } | null;
  } | null;
};

export type Project_LikeMutationVariables = Exact<{
  projectId: Scalars['Int'];
}>;

export type Project_LikeMutation = {
  __typename?: 'Mutation';
  project_like?: {
    __typename?: 'ResponseBaseOfUserLikeProject';
    status: ResponseStatus;
    result?: {
      __typename?: 'UserLikeProject';
      projectId: number;
      userId: number;
      id: number;
      isDeleted: boolean;
      createdDate: any;
      project?: {
        __typename?: 'Project';
        projectStatus: ProjectStatus;
        title?: string | null;
        description?: string | null;
        duration: number;
        availability: Availability;
        streetAddress?: string | null;
        city?: string | null;
        state?: string | null;
        projectDeadLine: any;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null;
      user?: {
        __typename?: 'Users';
        email?: string | null;
        userName?: string | null;
        lastSeen: any;
        userTypes: UserTypes;
        imageAddress?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        bio?: string | null;
        streetAddress?: string | null;
        city?: string | null;
        state?: string | null;
        isActive: boolean;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
        asHuduRates: number;
        listersWhoRatedToMeCount: number;
        asListerRates: number;
        huduersWhoRatedToMeCount: number;
        averageRate: number;
        externalId?: string | null;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null;
    } | null;
  } | null;
};

export type Project_ReopenProjectMutationVariables = Exact<{
  projectId: Scalars['Int'];
}>;

export type Project_ReopenProjectMutation = {
  __typename?: 'Mutation';
  project_reopenProject?: {
    __typename?: 'ResponseBaseOfProject';
    status: ResponseStatus;
    result?: {
      __typename?: 'Project';
      projectStatus: ProjectStatus;
      title?: string | null;
      description?: string | null;
      duration: number;
      availability: Availability;
      streetAddress?: string | null;
      city?: string | null;
      state?: string | null;
      projectDeadLine: any;
      longitude: number;
      latitude: number;
      zipCode?: string | null;
      userId: number;
      id: number;
      isDeleted: boolean;
      createdDate: any;
      bids?: Array<{
        __typename?: 'Bid';
        bidStatus: BidStatus;
        amount: number;
        description?: string | null;
        hudusComment?: string | null;
        hudusRate?: string | null;
        isHuduCommented: boolean;
        listersComment?: string | null;
        listersRate?: string | null;
        isListerCommented: boolean;
        huduId: number;
        listerId: number;
        projectId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
      questions?: Array<{
        __typename?: 'Question';
        text?: string | null;
        parentId?: number | null;
        projectId: number;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
      projectImages?: Array<{
        __typename?: 'ProjectImages';
        imageAddress?: string | null;
        projectId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
      userLikeProjects?: Array<{
        __typename?: 'UserLikeProject';
        projectId: number;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
      user?: {
        __typename?: 'Users';
        email?: string | null;
        userName?: string | null;
        lastSeen: any;
        userTypes: UserTypes;
        imageAddress?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        bio?: string | null;
        streetAddress?: string | null;
        city?: string | null;
        state?: string | null;
        isActive: boolean;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
        asHuduRates: number;
        listersWhoRatedToMeCount: number;
        asListerRates: number;
        huduersWhoRatedToMeCount: number;
        averageRate: number;
        externalId?: string | null;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null;
    } | null;
  } | null;
};

export type Project_UnlikeMutationVariables = Exact<{
  projectId: Scalars['Int'];
  userId?: InputMaybe<Scalars['Int']>;
}>;

export type Project_UnlikeMutation = {
  __typename?: 'Mutation';
  project_unlike?: {
    __typename?: 'ResponseBaseOfUserLikeProject';
    status: ResponseStatus;
    result?: {
      __typename?: 'UserLikeProject';
      projectId: number;
      userId: number;
      id: number;
      isDeleted: boolean;
      createdDate: any;
      project?: {
        __typename?: 'Project';
        projectStatus: ProjectStatus;
        title?: string | null;
        description?: string | null;
        duration: number;
        availability: Availability;
        streetAddress?: string | null;
        city?: string | null;
        state?: string | null;
        projectDeadLine: any;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null;
      user?: {
        __typename?: 'Users';
        email?: string | null;
        userName?: string | null;
        lastSeen: any;
        userTypes: UserTypes;
        imageAddress?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        bio?: string | null;
        streetAddress?: string | null;
        city?: string | null;
        state?: string | null;
        isActive: boolean;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
        asHuduRates: number;
        listersWhoRatedToMeCount: number;
        asListerRates: number;
        huduersWhoRatedToMeCount: number;
        averageRate: number;
        externalId?: string | null;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null;
    } | null;
  } | null;
};

export type Project_GetProjectQueryVariables = Exact<{
  projectId: Scalars['Int'];
}>;

export type Project_GetProjectQuery = {
  __typename?: 'Query';
  project_getProject?: {
    __typename?: 'ResponseBaseOfProjectDto';
    status: ResponseStatus;
    result?: {
      __typename?: 'ProjectDto';
      isLiked: boolean;
      project?: {
        __typename?: 'Project';
        projectStatus: ProjectStatus;
        title?: string | null;
        description?: string | null;
        duration: number;
        availability: Availability;
        streetAddress?: string | null;
        city?: string | null;
        state?: string | null;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
        projectImages?: Array<{
          __typename?: 'ProjectImages';
          imageAddress?: string | null;
          id: number;
        } | null> | null;
        bids?: Array<{
          __typename?: 'Bid';
          bidStatus: BidStatus;
          amount: number;
          description?: string | null;
          hudu?: {
            __typename?: 'Users';
            userName?: string | null;
            imageAddress?: string | null;
            averageRate: number;
            listersWhoRatedToMeCount: number;
            huduersWhoRatedToMeCount: number;
          } | null;
          lister?: {
            __typename?: 'Users';
            userName?: string | null;
            imageAddress?: string | null;
            averageRate: number;
            listersWhoRatedToMeCount: number;
            huduersWhoRatedToMeCount: number;
          } | null;
        } | null> | null;
        questions?: Array<{
          __typename?: 'Question';
          text?: string | null;
          parentId?: number | null;
          parentQuestion?: {
            __typename?: 'Question';
            text?: string | null;
          } | null;
          childrenQuestions?: Array<{
            __typename?: 'Question';
            text?: string | null;
          } | null> | null;
          user?: {__typename?: 'Users'; userName?: string | null} | null;
        } | null> | null;
        user?: {
          __typename?: 'Users';
          email?: string | null;
          userName?: string | null;
          imageAddress?: string | null;
          firstName?: string | null;
          lastName?: string | null;
          averageRate: number;
          listersWhoRatedToMeCount: number;
          huduersWhoRatedToMeCount: number;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type Project_GetProjectsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProjectDtoFilterInput>;
  order?: InputMaybe<Array<ProjectDtoSortInput> | ProjectDtoSortInput>;
  projectFilter?: InputMaybe<ProjectFilter>;
  location?: InputMaybe<Scalars['Position']>;
}>;

export type Project_GetProjectsQuery = {
  __typename?: 'Query';
  project_getProjects?: {
    __typename?: 'ListResponseBaseOfProjectDto';
    status: ResponseStatus;
    result?: {
      __typename?: 'ProjectDtoCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'ProjectDto';
        isLiked: boolean;
        project?: {
          __typename?: 'Project';
          projectStatus: ProjectStatus;
          title?: string | null;
          description?: string | null;
          duration: number;
          availability: Availability;
          streetAddress?: string | null;
          city?: string | null;
          state?: string | null;
          longitude: number;
          latitude: number;
          zipCode?: string | null;
          userId: number;
          id: number;
          isDeleted: boolean;
          createdDate: any;
          projectImages?: Array<{
            __typename?: 'ProjectImages';
            imageAddress?: string | null;
            id: number;
          } | null> | null;
          bids?: Array<{
            __typename?: 'Bid';
            bidStatus: BidStatus;
            amount: number;
            description?: string | null;
          } | null> | null;
        } | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Project_GetQuestionsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<QuestionFilterInput>;
  order?: InputMaybe<Array<QuestionSortInput> | QuestionSortInput>;
}>;

export type Project_GetQuestionsQuery = {
  __typename?: 'Query';
  project_getQuestions?: {
    __typename?: 'ListResponseBaseOfQuestion';
    status: ResponseStatus;
    result?: {
      __typename?: 'QuestionCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'Question';
        text?: string | null;
        parentId?: number | null;
        projectId: number;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
        user?: {
          __typename?: 'Users';
          userName?: string | null;
          email?: string | null;
          imageAddress?: string | null;
          firstName?: string | null;
        } | null;
        childrenQuestions?: Array<{
          __typename?: 'Question';
          userId: number;
          text?: string | null;
          user?: {__typename?: 'Users'; userName?: string | null} | null;
        } | null> | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Project_GetUserLikeProjectQueryVariables = Exact<{
  projectId: Scalars['Int'];
}>;

export type Project_GetUserLikeProjectQuery = {
  __typename?: 'Query';
  project_getUserLikeProject?: {
    __typename?: 'ResponseBaseOfProjectDto';
    status: ResponseStatus;
    result?: {
      __typename?: 'ProjectDto';
      isLiked: boolean;
      project?: {
        __typename?: 'Project';
        projectStatus: ProjectStatus;
        title?: string | null;
        description?: string | null;
        duration: number;
        availability: Availability;
        streetAddress?: string | null;
        city?: string | null;
        state?: string | null;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
        projectImages?: Array<{
          __typename?: 'ProjectImages';
          imageAddress?: string | null;
          id: number;
        } | null> | null;
        bids?: Array<{
          __typename?: 'Bid';
          bidStatus: BidStatus;
          amount: number;
          description?: string | null;
        } | null> | null;
      } | null;
    } | null;
  } | null;
};

export type Project_GetUserLikeProjectsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProjectDtoFilterInput>;
  order?: InputMaybe<Array<ProjectDtoSortInput> | ProjectDtoSortInput>;
  projectFilter?: InputMaybe<ProjectFilter>;
  location?: InputMaybe<Scalars['Position']>;
}>;

export type Project_GetUserLikeProjectsQuery = {
  __typename?: 'Query';
  project_getUserLikeProjects?: {
    __typename?: 'ListResponseBaseOfProjectDto';
    status: ResponseStatus;
    result?: {
      __typename?: 'ProjectDtoCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'ProjectDto';
        isLiked: boolean;
        project?: {
          __typename?: 'Project';
          projectStatus: ProjectStatus;
          title?: string | null;
          description?: string | null;
          duration: number;
          availability: Availability;
          streetAddress?: string | null;
          city?: string | null;
          state?: string | null;
          longitude: number;
          latitude: number;
          zipCode?: string | null;
          userId: number;
          id: number;
          isDeleted: boolean;
          createdDate: any;
          projectImages?: Array<{
            __typename?: 'ProjectImages';
            imageAddress?: string | null;
            id: number;
          } | null> | null;
          bids?: Array<{
            __typename?: 'Bid';
            bidStatus: BidStatus;
            amount: number;
            description?: string | null;
          } | null> | null;
        } | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type User_LoginQueryVariables = Exact<{[key: string]: never}>;

export type User_LoginQuery = {
  __typename?: 'Query';
  user_login?: {
    __typename?: 'ResponseBaseOfUsers';
    status: ResponseStatus;
    result?: {
      __typename?: 'Users';
      email?: string | null;
      userName?: string | null;
      lastSeen: any;
      userTypes: UserTypes;
      imageAddress?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      bio?: string | null;
      streetAddress?: string | null;
      city?: string | null;
      state?: string | null;
      longitude: number;
      latitude: number;
      zipCode?: string | null;
      externalId?: string | null;
      id: number;
      isDeleted: boolean;
      createdDate: any;
    } | null;
  } | null;
};

export type User_SignUpMutationVariables = Exact<{[key: string]: never}>;

export type User_SignUpMutation = {
  __typename?: 'Mutation';
  user_signUp?: {
    __typename?: 'ResponseBaseOfUsers';
    status: ResponseStatus;
    result?: {
      __typename?: 'Users';
      email?: string | null;
      userName?: string | null;
      lastSeen: any;
      userTypes: UserTypes;
      imageAddress?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      bio?: string | null;
      streetAddress?: string | null;
      city?: string | null;
      state?: string | null;
      longitude: number;
      latitude: number;
      zipCode?: string | null;
      externalId?: string | null;
      id: number;
      isDeleted: boolean;
      createdDate: any;
    } | null;
  } | null;
};

export type User_UpdateLastSeenMutationVariables = Exact<{
  [key: string]: never;
}>;

export type User_UpdateLastSeenMutation = {
  __typename?: 'Mutation';
  user_UpdateLastSeen?: {
    __typename?: 'ResponseBaseOfUsers';
    status: ResponseStatus;
    result?: {
      __typename?: 'Users';
      email?: string | null;
      userName?: string | null;
      lastSeen: any;
      userTypes: UserTypes;
      imageAddress?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      bio?: string | null;
      streetAddress?: string | null;
      city?: string | null;
      state?: string | null;
      isActive: boolean;
      longitude: number;
      latitude: number;
      zipCode?: string | null;
      asHuduRates: number;
      listersWhoRatedToMeCount: number;
      asListerRates: number;
      huduersWhoRatedToMeCount: number;
      averageRate: number;
      externalId?: string | null;
      id: number;
      isDeleted: boolean;
      createdDate: any;
    } | null;
  } | null;
};

export type User_UpdateProfileMutationVariables = Exact<{
  userInput?: InputMaybe<UserInput>;
}>;

export type User_UpdateProfileMutation = {
  __typename?: 'Mutation';
  user_updateProfile?: {
    __typename?: 'ResponseBaseOfUsers';
    status: ResponseStatus;
    result?: {
      __typename?: 'Users';
      email?: string | null;
      userName?: string | null;
      lastSeen: any;
      userTypes: UserTypes;
      imageAddress?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      bio?: string | null;
      streetAddress?: string | null;
      city?: string | null;
      state?: string | null;
      isActive: boolean;
      longitude: number;
      latitude: number;
      zipCode?: string | null;
      asHuduRates: number;
      listersWhoRatedToMeCount: number;
      asListerRates: number;
      huduersWhoRatedToMeCount: number;
      averageRate: number;
      externalId?: string | null;
      id: number;
      isDeleted: boolean;
      createdDate: any;
    } | null;
  } | null;
};

export type User_GetProfileQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['Int']>;
}>;

export type User_GetProfileQuery = {
  __typename?: 'Query';
  user_getProfile?: {
    __typename?: 'ResponseBaseOfUsers';
    status: ResponseStatus;
    result?: {
      __typename?: 'Users';
      email?: string | null;
      userName?: string | null;
      lastSeen: any;
      userTypes: UserTypes;
      imageAddress?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      bio?: string | null;
      streetAddress?: string | null;
      city?: string | null;
      state?: string | null;
      isActive: boolean;
      longitude: number;
      latitude: number;
      zipCode?: string | null;
      asHuduRates: number;
      listersWhoRatedToMeCount: number;
      asListerRates: number;
      huduersWhoRatedToMeCount: number;
      averageRate: number;
      externalId?: string | null;
      id: number;
      isDeleted: boolean;
      createdDate: any;
      userLikeProjects?: Array<{
        __typename?: 'UserLikeProject';
        projectId: number;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
    } | null;
  } | null;
};
