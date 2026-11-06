import { useState } from "react"; //  დავამატე useState-ის იმპორტი
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import styles from './login.module.css'; 

const schema = yup.object({
  username: yup.string().required("enter username"),
  password: yup.string().required("enter password"),
});

export default function LoginPage() {
  //  დავამატე showPassword სტეიტი
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("https://fakestoreapi.com/auth/login", {
        username: data.username,
        password: data.password,
      });

      if (response.data.token) {
        const token = response.data.token;
        if (data.remember) {
          localStorage.setItem("userToken", token);
        } else {
          sessionStorage.setItem("userToken", token);
        }
        window.location.href = "/"; 
      }
    } catch (error) {
      alert("ავტორიზაცია ვერ მოხერხდა შეიყვანეთ სწორი მონაცემები");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.formCard} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.title}>Authorization</h2>
        
        <input {...register("username")} placeholder="Username " className={styles.inputField} />
        <p className={styles.errorText}>{errors.username?.message}</p>
        
        {/*   დაემატა position: relative და ღილაკი */}
        <div style={{ position: 'relative' }}>
          <input 
            type={showPassword ? "text" : "password"} // აკონტროლებს გამოჩენას
            {...register("password")} 
            placeholder="Password " 
            className={styles.inputField} 
          />
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '10px',
              top: '12px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '12px',
              color: '#0070f3'
            }}
          >
            {showPassword ? "hide" : "show"}
          </button>
        </div>
        <p className={styles.errorText}>{errors.password?.message}</p>

        <label className="flex items-center gap-2 mt-4 mb-2 cursor-pointer text-gray-500">
          <input 
            type="checkbox" 
            {...register("remember")} 
            className="w-4 h-4 cursor-pointer accent-blue-600"
          />
          <span className="text-sm font-medium">Remember me</span>
        </label>

        <button type="submit" className={styles.submitBtn}>log in</button>
      </form>
    </div>
  );
}
