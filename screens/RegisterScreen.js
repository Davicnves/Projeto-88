singIn = async (email,password) => {
    firebase
     .auth()
     .singInWithEmailAndPassword(email, password)
     .then(() => {
        this.props.navigation.replace("Dashboard");
     })
     .catch(error => {
        Alert.alert(error.message);
     });
};

registerUser = (email, password, confirmPassword, first_name, last_name) => {
    if(password == confirmPassword) {
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            Alert.alert("Usuário registrado");
        })
        .catch(error => {
            Alert.alert(error.message)
        });
    } else {
      Alert.alert("As senhas não são iguais!");
    }
};