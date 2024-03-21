import css from './Options.module.css';

export default function Options({
  updateFeedback,
  handleResetFeedbacks,
  total,
}) {
  return (
    <div>
      <button
        className={css.btn}
        type="button"
        onClick={() => updateFeedback('good')}
      >
        Good
        </button>

      <button
        className={css.btn}
        type="button"
        onClick={() => updateFeedback('neutral')}
      >
        Neutral
        </button>

      <button
        className={css.btn}
        type="button"
        onClick={() => updateFeedback('bad')}
      >
        Bad
        </button>

      {total > 0 && (
        <button
          className={css.btn}
          type="button"
          onClick={handleResetFeedbacks}
        >
          Reset
        </button>
      )}
    </div>
  );
}