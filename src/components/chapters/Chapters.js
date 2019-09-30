import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';

import { Chapter } from './Chapter';

export const Chapters = ({
  chapters,
  paragraphs,
  renderOffscreen,
  showUnsupported,
}) => {
  const classes = useStyles();
  const [_chapters, setChapters] = useState([]);

  useEffect(() => {
    const __chapters = Object.keys(chapters).map(chapterKey => {
      const chapter = chapters[chapterKey];
      const _chapter = (
        <Chapter
          key={chapterKey}
          chapterKey={chapterKey}
          chapter={chapter}
          paragraphs={paragraphs}
          renderOffscreen={renderOffscreen}
          showUnsupported={showUnsupported}
        />
      );
      return _chapter
    });
    setChapters(__chapters);
  }, [chapters, paragraphs, renderOffscreen, showUnsupported]);

  return (
    <div className={classes.chapters} dir='auto'>
      {_chapters}
    </div>
  );
};

Chapters.propTypes = {
  chapters: PropTypes.object.isRequired,
  /** render verses paragraphs, use explicit paragraphs */
  paragraphs: PropTypes.bool,
  /** bypass rendering only when visible */
  renderOffscreen: PropTypes.bool,
  /** render unsupported usfm markers */ 
  showUnsupported: PropTypes.bool,
};

const useStyles = makeStyles(theme => ({
  chapters: {
  },
}));

export default Chapters;
