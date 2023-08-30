type RecipeDetailsInstructionsProps = {
  instruction: string;
  videoUrl?: string;
};

function RecipeDetailsInstruction(
  { instruction, videoUrl = undefined }: RecipeDetailsInstructionsProps,
) {
  return (
    <div>
      <h2>Instructions</h2>
      <p
        data-testid="instructions"
        className="whitespace-break-spaces leading-2"
      >
        {instruction}
      </p>

      {videoUrl && (
        <>
          <h2>Video</h2>
          <iframe
            data-testid="video"
            title="video"
            src={ videoUrl }
          />
        </>
      )}
    </div>
  );
}

export default RecipeDetailsInstruction;
