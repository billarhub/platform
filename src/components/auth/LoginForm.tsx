'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import Card from '../common/Card';
import { Input } from '../common/Input';
import Button from '../common/Button';
import UserIcon from '../icon/UserIcon';
import PasswordIcon from '../icon/PasswordIcon';
import { createLoginFormSchema } from '@/lib/schemas/loginSchema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ILoginPayload } from '@/models';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';

function LoginForm() {
  const loginTranslation = useTranslations('Login');
  const commonTranslations = useTranslations('Common');
  const loginFormSchema = createLoginFormSchema(commonTranslations);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ILoginPayload>({
    resolver: zodResolver(loginFormSchema),
  });

  const handleLogin: SubmitHandler<ILoginPayload> = async (
    data,
    e?: React.BaseSyntheticEvent
  ) => {
    e?.preventDefault();
    try {
      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
      });
      // const res = await fetch(
      //   'https://dev-api-billarhub.onrender.com/auth/login',
      //   {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
            
      //     },
      //     body: JSON.stringify({
      //       email: data.email,
      //       password: data.password,
      //     }),
      //   }
      // );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-screen md:w-full h-full flex justify-center items-center p-4 md:p-0">
      <Card className="rounded-xl md:h-auto md:w-[687px]">
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col justify-center items-center px-6 py-10 md:px-24 md:py-16 gap-5 text-black"
        >
          <h1 className="md:text-2xl text-md font-bold text-black uppercase mb-6">
            {loginTranslation('title')}
          </h1>
          <Input
            placeholder={loginTranslation('email')}
            {...register('email')}
            name="email"
            className="w-full"
            inputClassName="placeholder:font-base uppercase"
            leftIcon={<UserIcon className="w-8 h-8 rounded-md" />}
            error={errors?.email?.message}
          />
          <Input
            placeholder={loginTranslation('password')}
            {...register('password')}
            name="password"
            className="w-full"
            type="password"
            inputClassName="placeholder:font-base uppercase"
            leftIcon={<PasswordIcon className="w-8 h-8 rounded-md" />}
            error={errors?.password?.message}
          />
          <Button
            type="submit"
            className="md:w-1/3 md:text-lg text-md rounded-3xl"
          >
            {loginTranslation('submit')}
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default LoginForm;
