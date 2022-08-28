import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighLighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
//coldarkDark, a11yDark, dracula
import Image from 'next/image';
import PostHeader from './post-header';
import styles from './post-content.module.css';

const PostContent = (props) => {
  const { post } = props;
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  const customComponent = {
    // img(image) {
    //   return (
    //     <Image
    //       className={styles.image}
    //       src={`/images/posts/${post.slug}/${image.src}`}
    //       alt={image.alt}
    //       width={600}
    //       height={300}
    //     />
    //   );
    // },
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
            showLineNumbers={languageFormat[1] === 'console' ? false : true}
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
    </article>
  );
};

export default PostContent;
