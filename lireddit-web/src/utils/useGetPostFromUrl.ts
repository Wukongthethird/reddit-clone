import { useRouter } from "next/router";
import { usePostQuery } from "../generated/graphql";
import { useGetIntid } from "./useGetIntid";



export const useGetPostFromUrl = () => {
  const intId = useGetIntid()
  return usePostQuery({
    pause: intId ===-1,
    variables:{
      identifier: intId
    }
  }) 
};

