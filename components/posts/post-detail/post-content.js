import ReactMarkdown from 'react-markdown';
import { PrismLight as SyntaxHighLighter } from 'react-syntax-highlighter';
import a11yDark from 'react-syntax-highlighter/dist/cjs/styles/prism/a11y-dark';
import ts from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import markup from 'react-syntax-highlighter/dist/cjs/languages/prism/markup';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import scss from 'react-syntax-highlighter/dist/cjs/languages/prism/scss';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';

SyntaxHighLighter.registerLanguage('ts', ts);
SyntaxHighLighter.registerLanguage('markup', markup);
SyntaxHighLighter.registerLanguage('bash', bash);
SyntaxHighLighter.registerLanguage('scss', scss);
SyntaxHighLighter.registerLanguage('jsx', jsx);

import Image from 'next/image';
import PostHeader from './post-header';
import styles from './post-content.module.css';
import PostFooter from './post-footer';

const PostContent = (props) => {
  const { post } = props;
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  const customComponent = {
    p(paragraph) {
      const { node } = paragraph;
      if(node.children[0].tagName === 'img') {
        const { alt, properties } = node.children[0];
        let imagePath = '';
        let imgWidth = 526;
        let imgHeight = 336;
        
        if(properties.src.includes('=')) {
          const [path, size] = properties.src.split('=');
          const [width, height] = size.split('x');
          imagePath = path;
          imgWidth = +width;
          imgHeight = +height;
        }else{
          imagePath = properties.src;
        }

        return (
          <div className={styles.image}>
            <Image
              src={`/images/posts/${post.slug}/${imagePath}`}
              alt={alt}
              width={imgWidth}
              height={imgHeight}
            />
          </div>  
        );
      }

      return <p>{paragraph.children}</p>
    },
    code(code) {
      const { className, children } = code;
      if(className) {
        const languageFormat = className.split('-');
        return (
          <SyntaxHighLighter 
            style={a11yDark}
            language={languageFormat[1]}
            showLineNumbers={languageFormat[1] === 'bash' ? false : true}
            wrapLines
          >
            {children}
          </SyntaxHighLighter>
        )
      }else{
        return (
          <code className={styles.codeLabel}>
            {children}
          </code>
        );
      }
    }
  };

  return (
    <article className={styles.content}>
      <PostHeader 
        title={post.title} 
        image={imagePath}
      />
      <ReactMarkdown
        components={customComponent}
      >
        {post.content}
      </ReactMarkdown>
      <PostFooter
        author={post.author}
        image={post.profile}
        repository={post.gitHubRepository}
        date={post.date}
      />
    </article>
  );
};

export default PostContent;
