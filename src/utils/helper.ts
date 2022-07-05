import {stateList} from '~/constants/mockData';
import {ResponseStatus} from '~/generated/graphql';

export const getResponseMessage = (response: string = '') => {
  switch (response) {
    case ResponseStatus.Success:
      return {type: 'success', message: 'Success', icon: 'success'};
    case ResponseStatus.AccessDenied:
      return {type: 'danger', message: 'Access denied', icon: 'danger'};
    case ResponseStatus.ActiveBidsExist:
      return {type: 'danger', message: 'Active bids exist', icon: 'danger'};
    case ResponseStatus.ActiveBidsExist:
      return {type: 'danger', message: 'Active bids exist', icon: 'danger'};
    case ResponseStatus.AlreadyExist:
      return {
        type: 'danger',
        message: 'This user is already exist',
        icon: 'danger',
      };
    case ResponseStatus.AlreadyFollowed:
      return {
        type: 'danger',
        message: 'This user is already followed',
        icon: 'danger',
      };
    case ResponseStatus.AlreadyRemoved:
      return {
        type: 'danger',
        message: 'This user is already removed',
        icon: 'danger',
      };
    case ResponseStatus.AuthenticationFailed:
      return {type: 'danger', message: 'Authentication failed', icon: 'danger'};
    case ResponseStatus.CommentNotFound:
      return {type: 'danger', message: 'Comment not found', icon: 'danger'};
    case ResponseStatus.DiffrenetIds:
      return {type: 'danger', message: 'Different ids', icon: 'danger'};
    case ResponseStatus.DurationIsRequired:
      return {type: 'danger', message: 'Duration is required', icon: 'danger'};
    case ResponseStatus.Failed:
      return {type: 'danger', message: 'Failed', icon: 'danger'};
    case ResponseStatus.HostNotFound:
      return {type: 'danger', message: 'Host not found', icon: 'danger'};
    case ResponseStatus.InvalidTimeRange:
      return {type: 'danger', message: 'Invalid time range', icon: 'danger'};
    case ResponseStatus.InvalidTimeSyntax:
      return {type: 'danger', message: 'Invalid time syntax', icon: 'danger'};
    case ResponseStatus.InProgressBidExist:
      return {type: 'danger', message: 'In progress bid exist', icon: 'danger'};
    case ResponseStatus.NotAllowed:
      return {type: 'danger', message: 'Not allowed', icon: 'danger'};
    case ResponseStatus.NotEnoughData:
      return {type: 'danger', message: 'Not enough data', icon: 'danger'};
    case ResponseStatus.NotFound:
      return {type: 'danger', message: 'Not found', icon: 'danger'};
    case ResponseStatus.PostNotFound:
      return {type: 'danger', message: 'Post not found', icon: 'danger'};
    case ResponseStatus.SameId:
      return {type: 'danger', message: 'Same id', icon: 'danger'};
    case ResponseStatus.SelfBidNotAllowed:
      return {type: 'danger', message: 'Self bid not allowed', icon: 'danger'};
    case ResponseStatus.SelfMessageNotAllowed:
      return {
        type: 'danger',
        message: 'Self message not allowed',
        icon: 'danger',
      };
    case ResponseStatus.TimeConflict:
      return {type: 'danger', message: 'Time conflict', icon: 'danger'};
    case ResponseStatus.UnknownError:
      return {type: 'danger', message: 'Unknown error', icon: 'danger'};
    case ResponseStatus.UsernameAlreadyExist:
      return {
        type: 'danger',
        message: 'Username already exist',
        icon: 'danger',
      };
    case ResponseStatus.UserNotFound:
      return {type: 'danger', message: 'User is de active', icon: 'danger'};
    default:
      return {type: 'danger', message: 'Unknown Error', icon: 'danger'};
  }
};

export const getLocationFromState = (state: string = '') => {
  const res = stateList.find(
    (stateElement: any) => stateElement?.value === state,
  );
  return res;
};

export const getStateNameFromShortName = (state: string = '') => {
  const res = stateList.find(
    (stateElement: any) => stateElement?.value === state,
  );
  return res?.title ?? -1;
};
