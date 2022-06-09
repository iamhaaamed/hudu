import {ResponseStatus} from '~/generated/graphql';

export const getResponseMessage = (response: string = '') => {
  switch (response) {
    case ResponseStatus.Success:
      return {type: 'success', message: 'Success'};
    case ResponseStatus.AccessDenied:
      return {type: 'success', message: 'Access denied'};
    case ResponseStatus.ActiveBidsExist:
      return {type: 'success', message: 'Active bids exist'};
    case ResponseStatus.ActiveBidsExist:
      return {type: 'success', message: 'Active bids exist'};
    case ResponseStatus.AlreadyExist:
      return {type: 'danger', message: 'This user is already exist'};
    case ResponseStatus.AlreadyFollowed:
      return {type: 'danger', message: 'This user is already followed'};
    case ResponseStatus.AlreadyRemoved:
      return {type: 'danger', message: 'This user is already removed'};
    case ResponseStatus.AuthenticationFailed:
      return {type: 'danger', message: 'Authentication failed'};
    case ResponseStatus.CommentNotFound:
      return {type: 'danger', message: 'Comment not found'};
    case ResponseStatus.DiffrenetIds:
      return {type: 'danger', message: 'Different ids'};
    case ResponseStatus.DurationIsRequired:
      return {type: 'danger', message: 'Duration is required'};
    case ResponseStatus.Failed:
      return {type: 'danger', message: 'Failed'};
    case ResponseStatus.HostNotFound:
      return {type: 'danger', message: 'Host not found'};
    case ResponseStatus.InvalidTimeRange:
      return {type: 'danger', message: 'Invalid time range'};
    case ResponseStatus.InvalidTimeSyntax:
      return {type: 'danger', message: 'Invalid time syntax'};
    case ResponseStatus.InProgressBidExist:
      return {type: 'danger', message: 'In progress bid exist'};
    case ResponseStatus.NotAllowed:
      return {type: 'danger', message: 'Not allowed'};
    case ResponseStatus.NotEnoughData:
      return {type: 'danger', message: 'Not enough data'};
    case ResponseStatus.NotFound:
      return {type: 'danger', message: 'Not found'};
    case ResponseStatus.PostNotFound:
      return {type: 'danger', message: 'Post not found'};
    case ResponseStatus.SameId:
      return {type: 'danger', message: 'Same id'};
    case ResponseStatus.SelfBidNotAllowed:
      return {type: 'danger', message: 'Self bid not allowed'};
    case ResponseStatus.SelfMessageNotAllowed:
      return {type: 'danger', message: 'Self message not allowed'};
    case ResponseStatus.TimeConflict:
      return {type: 'danger', message: 'Time conflict'};
    case ResponseStatus.UnknownError:
      return {type: 'danger', message: 'Unknown error'};
    case ResponseStatus.UsernameAlreadyExist:
      return {type: 'danger', message: 'Username already exist'};
    case ResponseStatus.UserNotFound:
      return {type: 'danger', message: 'User not found'};
    default:
      return {type: 'danger', message: 'Unknown Error'};
  }
};
