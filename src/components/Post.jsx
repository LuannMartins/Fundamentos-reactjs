import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'
import { useState } from 'react';

import { Avatar } from './Avatar';
import { Comment } from './Comment';

import styles from './Post.module.css';



export function Post({ author, publishedAt, content }) {
    const [comments, setComments] = useState ([ // estado = são variáveis que eu quero que o componente monitore.
        'Post muito bacana, hein?!'
    ])

    const [newCommentText, setNewCommentText] = useState('')

    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR,
    });

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true,
    })

    function handleCreateNewComment(event) {
        event.preventDefault(); 

        // const newCommentText = event.target.comment.value // target vai pegar o elemento da tag que está usando o evento.
        setComments([...comments, newCommentText]) // ...comments os 3 pontos no começo da variável serve para copiar determinada variável.
        setNewCommentText('');
    }

    function handleNewCommentChange(event) {
        event.target.setCustomValidity('')
        setNewCommentText(event.target.value);
    }

    function handleNewCommentInvalid(event) {
        event.target.setCustomValidity('Esse campo é obrigatório')
    }

    function deleteComment(commentToDelete) { // imutabilidade -> as variáveis não sofrem mutação ou alteração, nós criamos um novo valor (um novo espaço na memória)
        const commentsWithOutDeleteOne = comments.filter(comment => {
            return comment != commentToDelete
        })
        
        setComments(commentsWithOutDeleteOne);
    }

    const isNewCommentEmpty = newCommentText.length == 0

    return ( 
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

            <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
                {publishedDateRelativeToNow}
            </time>    
            </header>

            <div className={styles.content}>
                {content.map(line => {
                    if (line.type == 'paragraph') {
                        return <p key={line.content}>{line.content}</p>
                    } else if (line.type == 'link') {
                        return <p key={line.content}><a href="#">{line.content}</a></p>
                    }     
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea 
                    name="comment"
                    placeholder="Deixe seu comentário"
                    value={newCommentText}
                    onChange={handleNewCommentChange}  
                    onInvalid={handleNewCommentInvalid}
                    required                      
                />
                <footer>
                    <button type="submit" disabled={isNewCommentEmpty}>
                        Publicar
                    </button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment => {
                    return (
                    <Comment
                        key={comment} 
                        content={comment} 
                        onDeleteComment={deleteComment} 
                    />
                ) 
                })}
            </div>
        </article>
    )
}
// key no react 

// Por que única?

// 3 momentos em que um componente é renderizado novamente no react.

// 1. Quando o estado alterado;
// 2. Quando a propiedade alterada;
// 3. Quando um componente pai renderizado novamente;

//export default Post // com export eu posso importa os arquivos 

// Default Export vs Named Exports

// Com Default Export eu posso alterar nome da importação da forma que quiser.
// Com Named Exports eu não posso alterar nome da importação ou na Função tem que ser especifico ou unico.