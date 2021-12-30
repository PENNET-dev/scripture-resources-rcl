import React from 'react';
import PropTypes from 'prop-types';

import {
  MilestoneObject,
  TextObject,
  WordObject,
  AlignedWordsObject,
  SectionObject,
  FootnoteObject,
  UnsupportedObject,
} from '.';

function VerseObject({
  verseObject,
  originalWords = [],
  paragraphs,
  showUnsupported,
  disableWordPopover,
  getLexiconData,
  translate,
}) {
  const { type } = verseObject;
  let component;

  switch (type) {
    case 'text':
      component = (
        <TextObject verseObject={verseObject} paragraphs={paragraphs} />
      );
      break;
    case 'quote':
      component = <TextObject verseObject={verseObject} />;
      break;
    case 'milestone':
      component = (
        <MilestoneObject
          verseObject={verseObject}
          originalWords={originalWords}
          disableWordPopover={disableWordPopover}
          getLexiconData={getLexiconData}
          translate={translate}
        />
      );
      break;
    case 'word':
      if (verseObject.strong) {
        component = (
          <AlignedWordsObject
            children={[verseObject]}
            originalWords={[verseObject]}
            disableWordPopover={disableWordPopover}
            getLexiconData={getLexiconData}
            translate={translate}
          />
        );
      } else {
        component = (
          <WordObject
            verseObject={verseObject}
            disableWordPopover={disableWordPopover}
          />
        );
      }
      break;
    case 'section':
      component = <SectionObject verseObject={verseObject} />;
      break;
    case 'paragraph':
      component = <div />;
      break;
    case 'footnote':
      component = <FootnoteObject verseObject={verseObject} />;
      break;
    default:
      if (showUnsupported) {
        component = <UnsupportedObject verseObject={verseObject} />;
      }
      break;
  }

  return (
    <>
      {component}
      {verseObject.nextChar}
    </>
  );
}

VerseObject.propTypes = {
  verseObject: PropTypes.shape({
    type: PropTypes.oneOf([
      'text',
      'quote',
      'milestone',
      'word',
      'section',
      'paragraph',
      'footnote',
    ]),
    children: PropTypes.arrayOf(PropTypes.object),
    strong: PropTypes.string,
  }).isRequired,
  originalWords: PropTypes.array,
  /** render verses paragraphs, use explicit paragraphs */
  paragraphs: PropTypes.bool,
  /** render unsupported usfm markers */
  showUnsupported: PropTypes.bool,
  /** disable popovers for aligned and original language words */
  disableWordPopover: PropTypes.bool,
  /** optional function to lookup lexicon data */
  getLexiconData: PropTypes.func,
  /** optional function for localization */
  translate: PropTypes.func,
};

export default VerseObject;
