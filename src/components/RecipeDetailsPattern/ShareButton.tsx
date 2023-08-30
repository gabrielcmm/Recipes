import { useCallback, useState } from 'react';
import shareIcon from '../../images/shareIcon.svg';

type ShareButtonProps = {
  shareBtnTestId: string;
  linkToClipboard: string;
};

function ShareButton({ shareBtnTestId, linkToClipboard }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleClickCShare = useCallback(() => {
    navigator.clipboard.writeText(linkToClipboard).then(
      () => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 5000);
      },
    );
  }, [linkToClipboard]);

  return (
    <>
      <button
        className="text-white rounded-lg flex items-center justify-center"
        onClick={ handleClickCShare }
      >
        <img src={ shareIcon } alt="share icon" data-testid={ shareBtnTestId } />
      </button>
      {
        copied && (
          <div
            className="fixed top-2 right-2 transform bg-green-500
            text-white px-2 py-1 rounded shadow"
          >
            Link copied!
          </div>
        )
      }
    </>
  );
}

export default ShareButton;
