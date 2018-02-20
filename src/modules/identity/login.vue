<template>
  <b-container>

    <b-card no-body  class="card-container">

      <img id="profile-img" class="profile-img-card" src="//www.myiconfinder.com/uploads/iconsets/256-256-87cc0576629f9e533cd1d331fd98d8bc.png"/>

      <p id="profile-name" class="profile-name-card">MoneyTracker Authentication</p>

      <b-form class="form-signin" v-on:submit.prevent="login()">

        <div v-bind:class="{ 'helper-text': !error, 'error': error }">{{ headerMessage }}</div>

        <b-form-input
          type="text"
          placeholder="Email address"
          required
          autofocus
          :disabled="this.loading"
          v-model="data.username" />
        <b-form-input
          type="password"
          placeholder="Password"
          :disabled="this.loading"
          required
          v-model="data.password"
        />

        <button class="btn btn-lg btn-primary btn-block btn-signin" type="submit">
          <i v-show="!loading">Sign in</i>
          <font-awesome-icon v-show="loading" class="loader" size="1x" :icon="iconSpinner" spin/>
        </button>
      </b-form><!-- /form -->

      <a class="forgot-password text-center" @click="forgotPassword">
        Forgot the password?
      </a>


    </b-card><!-- /card-container -->

  </b-container>
</template>

<script>
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
  import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner'

  export default {
    name: 'login',
    components: {
      FontAwesomeIcon
    },
    computed: {
      iconSpinner() {
        return faSpinner
      }
    },
    data() {
      return {
        data: {
          username: 'admin',
          password: 'secret',
        },
        headerMessage: 'Provide your credentials to continue',
        loading: false,
        error: null,
      };
    },
    mounted() {
      console.log(this.$auth.redirect());
      // Can set query parameter here for auth redirect or just do it silently in login redirect.
    },
    methods: {
      login() {
        this.error = null;
        this.loading = true;
        this.$auth.login({
          url: 'http://0.0.0.0:8080/login',
          data: this.data,
          error: () => {
            this.error = true;
            this.headerMessage = 'Unable to sign in';
          },
          redirect: '/',
          fetchUser: false
        })
          .then(() => {
              this.loading = false;
          },
          (a) => {
              this.loading = false;
              setTimeout(() => {
                this.headerMessage = 'Provide your credentials to continue';
                this.error = false;
              }, 5000);
          });
      },
      forgotPassword() {
        alert('Too bad');
      }
    }
  };
</script>

<style lang="scss" scoped>

  .card-container.card {
    max-width: 450px;
    padding: 40px 40px;
  }

  .btn {
    font-weight: 700;
    height: 36px;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    cursor: default;
  }

  /*
   * Card component
   */
  .card {
    background-color: #F7F7F7;
    /* just in case there no content*/
    padding: 20px 25px 30px;
    margin: 0 auto 25px;
    margin-top: 50px;
    /* shadows and rounded borders */
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    -moz-box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
  }

  .profile-img-card {
    width: 96px;
    height: 96px;
    margin: 0 auto 10px;
    display: block;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
  }

  /*
   * Form styles
   */
  .profile-name-card {
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    margin: 10px 0 0;
    min-height: 1em;
  }

  .form-signin #inputEmail,
  .form-signin #inputPassword {
    direction: ltr;
    height: 44px;
    font-size: 16px;
  }

  .form-signin input[type=email],
  .form-signin input[type=password],
  .form-signin input[type=text],
  .form-signin button {
    width: 100%;
    display: block;
    margin-bottom: 10px;
    z-index: 1;
    position: relative;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .form-signin .form-control:focus {
    border-color: rgb(104, 145, 162);
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgb(104, 145, 162);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgb(104, 145, 162);
  }

  .btn.btn-signin {
    /*background-color: #4d90fe; */
    background-color: rgb(104, 145, 162);
    /* background-color: linear-gradient(rgb(104, 145, 162), rgb(12, 97, 33));*/
    padding: 0;
    font-weight: 700;
    font-size: 14px;
    height: 36px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    border-radius: 3px;
    border: none;
    -o-transition: all 0.218s;
    -moz-transition: all 0.218s;
    -webkit-transition: all 0.218s;
    transition: all 0.218s;

    i {
      font-style: normal;
    }
  }

  .btn.btn-signin:hover,
  .btn.btn-signin:active,
  .btn.btn-signin:focus {
    background-color: rgb(12, 97, 33);
  }

  .forgot-password {
    cursor: pointer;
    color: rgb(104, 145, 162);

    &:hover {
      text-decoration: underline;
    }
  }

  .forgot-password:hover,
  .forgot-password:active,
  .forgot-password:focus {
    color: rgb(12, 97, 33);
  }

  .helper-text {
    word-wrap:break-word;
    padding: 1rem;
    text-align: center;
  }

  .error {
    color:red;
    word-wrap:break-word;
    padding: 1rem;
    text-align: center;

    p {
      padding:0;
      margin: 0;
    }
  }
</style>
