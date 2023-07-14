- Las dependencias se instalan con npm i

- Si se está clonando el proyecto, recordar no hacer npm i directamente: ponerle ^ a las versiones de cada cosa antes para que instale versiones que no tengan vulnerabilidades. Luego quitarlo.

### General
- No usemos alert, usemos Sweet Alert:
```  
  import SweetAlert2 from 'sweetalert2';

          SweetAlert2.fire({
            icon: 'info',
            title: "Información"
          }).then()
```

Más ejemplos: https://sweetalert2.github.io/

### React
- Cambiar el estado causa un render. Por eso, para mantener el estado de sesión se usa local storage. Una alternativa es redux.

### Hooks
Para pasarse a Hooks si uno viene de clases
https://www.digitalocean.com/community/tutorials/five-ways-to-convert-react-class-components-to-functional-components-with-react-hooks

Para que ejecute algo cada vez que se renderice el componente
```    
    useEffect( () => {
            getQuestions().then();
        });
```

Para que se ejecute algo la primera vez que se renderiza el componente:
```
useEffect( () => {
    getQuestions().then();
}, [] );
```


https://blog.greenroots.info/react-useeffect-hook-usages-you-must-know

Ejemplo renderizado condicional:
```
                    <div>
                        { (user.isArtist) && (
                            <div>
                                <Typography component="h1"
                                            variant="h5">{"Artista"}
                                </Typography>

                                <div>
                                    <br/>
                                </div>
                            </div>
                            )
                        }
                    </div>
```

### Firebase
- Manejo de tokens: https://firebase.google.com/docs/auth/admin/verify-id-tokens
