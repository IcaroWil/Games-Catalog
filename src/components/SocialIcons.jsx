import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

const SocialIcons = () => {
  return (
    <div className="flex justify-center space-x-4 mt-8">
      <a
        href="https://github.com/IcaroWil"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
      >
        <FontAwesomeIcon icon={faGithub} size="2x" />
      </a>
      <a
        href="https://www.linkedin.com/in/icaro-oliveira-112031246/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-700 hover:text-blue-900 transition-colors duration-300"
      >
        <FontAwesomeIcon icon={faLinkedin} size="2x" />
      </a>
    </div>
  );
};

export default SocialIcons;
