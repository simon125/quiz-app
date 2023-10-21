import { FC } from "react";
import { Button } from "../../../../components";

export const SubmitPanel: FC = () => {
  return (
    <div className="fixed bottom-0 right-0 left-0 bg-zinc-50 shadow-xl border-t p-4">
      <div className="container mx-auto flex gap-3 justify-end">
        <Button type="submit">Submit</Button>
        <Button type="reset" variant="gray">
          Reset
        </Button>
      </div>
    </div>
  );
};
