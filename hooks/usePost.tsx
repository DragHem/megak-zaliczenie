import { useCallback, useReducer } from "react";
import { ErrorResponseStatus } from "interfaces/ErrorResponseStatus";
import { Signup } from "interfaces/signup/signup";

//@todo dopisać typ payload
type Action = {
  type: ActionEnum;
  payload?: any;
};

enum ActionEnum {
  LOADING = "LOADING",
  STATUS = "STATUS",
  MESSAGE = "MESSAGE",
}

type State = {
  isLoading: boolean;
  status: ErrorResponseStatus | undefined;
  message: string | undefined;
};

export type InviteFriend = { email: string };

const stateReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionEnum.LOADING:
      return { ...state, isLoading: !state.isLoading };
    case ActionEnum.STATUS:
      return { ...state, status: action.payload };
    case ActionEnum.MESSAGE:
      return { ...state, message: action.payload };

    default:
      return state;
  }
};

export default function usePost(
  url: string
): [State, (body: Signup | InviteFriend) => Promise<void>] {
  const [state, dispatch] = useReducer(stateReducer, {
    isLoading: false,
    status: undefined,
    message: undefined,
  });

  const sendData = useCallback(
    async (body: Signup | InviteFriend) => {
      dispatch({ type: ActionEnum.LOADING });

      try {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const responseData = await response.json();

        dispatch({ type: ActionEnum.STATUS, payload: responseData.status });
        dispatch({ type: ActionEnum.MESSAGE, payload: responseData.message });

        dispatch({ type: ActionEnum.LOADING });
      } catch (e: any) {
        dispatch({ type: ActionEnum.STATUS, payload: false });
      }
    },
    [url]
  );

  return [state, sendData];
}
