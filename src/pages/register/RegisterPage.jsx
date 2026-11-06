
import React, { useState } from 'react'; 
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import styles from './register.module.css';

const schema = yup.object().shape({
  firstName: yup.string().required('სახელი სავალდებულოა').min(4, 'მინ. 4 სიმბოლო').max(20, 'მაქს. 20'),
  lastName: yup.string().required('გვარი სავალდებულოა').min(4, 'მინ. 4 სიმბოლო').max(20, 'მაქს. 20'),
  age: yup.number().typeError('უნდა იყოს რიცხვი').required('სავალდებულოა').min(13, 'მინ. 13').max(120, 'მაქს. 120'),
  email: yup.string().email('არასწორი ფორმატი').required('სავალდებულოა'),
  password: yup.string()
    .required('სავალდებულოა')
    .min(6, 'მინ. 6 სიმბოლო')
    .max(12, 'მაქს. 12 სიმბოლო')
    .matches(/[A-Z]/, 'მინ. 1 დიდი ასო')
    .matches(/[a-z]/, 'მინ. 1 პატარა ასო')
    .matches(/[0-9]/, 'მინ. 1 ციფრი'),
  phone: yup.string()
    .required('სავალდებულოა')
    .matches(/^[0-9]+$/, 'მხოლოდ ციფრები')
    .min(10, 'მინ. 10 სიმბოლო')
    .max(100, 'მაქს. 100 სიმბოლო'),
});

export default function RegisterPage() {
 
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', data);
      console.log('Success:', response.data);
      alert('მომხმარებელი წარმატებით დარეგისტრირდა!');
      reset();
    } catch (error) {
      alert('შეცდომა გაგზავნისას');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <h1 className={styles.title}>რეგისტრაცია</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          
          <div className={styles.inputGroup}>
            <input {...register('firstName')} placeholder="First Name" className={styles.inputField} />
            <p className={styles.errorText}>{errors.firstName?.message}</p>
          </div>

          <div className={styles.inputGroup}>
            <input {...register('lastName')} placeholder="Last Name" className={styles.inputField} />
            <p className={styles.errorText}>{errors.lastName?.message}</p>
          </div>

          <div className={styles.inputGroup}>
            <input type="number" {...register('age')} placeholder="Age" className={styles.inputField} />
            <p className={styles.errorText}>{errors.age?.message}</p>
          </div>

          <div className={styles.inputGroup}>
            <input {...register('email')} placeholder="Email" className={styles.inputField} />
            <p className={styles.errorText}>{errors.email?.message}</p>
          </div>

          <div className={styles.inputGroup}>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? "text" : "password"} 
                {...register('password')} 
                placeholder="Password" 
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
                {showPassword ? "დამალვა" : "ჩვენება"}
              </button>
            </div>
            <p className={styles.errorText}>{errors.password?.message}</p>
          </div>

          <div className={styles.inputGroup}>
            <input {...register('phone')} placeholder="Phone Number" className={styles.inputField} />
            <p className={styles.errorText}>{errors.phone?.message}</p>
          </div>

          <button type="submit" className={styles.submitBtn}>
            დარეგისტრირება
          </button>
        </form>
      </div>
    </div>
  );
}