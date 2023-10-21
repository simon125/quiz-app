import { FC } from "react";
import { Grid } from "react-loader-spinner";

export const Loader: FC = () => {
  return (
    <Grid
      height="80"
      width="80"
      color="#54BEF8"
      ariaLabel="grid-loading"
      radius="12.5"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};
