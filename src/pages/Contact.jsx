import emailjs from '@emailjs/browser';
import  Loader  from '../components/Loader';
import { Canvas } from '@react-three/fiber';
import React ,{ Suspense, useState } from 'react';
import Fox from '../models/Fox';
import backgroundImage from  '../assets/images/Background_fox.jpeg'

const Contact = () => {
  
  const [form, setForm] = useState({name:'',email:'', message:''});
  const [isloading, setIsloading] = useState(false)
  const [currentAnimation, setCurrentAnimation] = useState('idle')
  

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsloading(true);
    setCurrentAnimation('hit');
    console.log("Sending email...");
  
    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        from_name: form.name,
        to_name: 'Manab',
        from_email: form.email,
        to_email: 'manab04.official@gmail.com',
        message: form.message,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then(() => {
      console.log("Email sent successfully!");
      setIsloading(false);

      setTimeout(() => {
        setCurrentAnimation('idle');
        setForm({ name: '', email: '', message: '' });
      },[4000])
      
    })
    .catch((error) => {
      console.error("Email failed to send:", error);
      setCurrentAnimation('idle');
      setIsloading(false);
      
    });
  };
  
  const handleFocus = (e) => setCurrentAnimation('walk');
  const handleBlur = (e) => setCurrentAnimation('idle');
 

  return (
      <div 
        className='absolute inset-0 bg-cover bg-center bg-no-repeat z-[-1]' 
        style={{ 
          backgroundImage: `url(${backgroundImage})`, 
          backgroundSize: 'cover',  
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center', 
          width: '100vw',  
          height: '100vh', 
        }}
      >

      <section className='relative flex lg:flex-row flex-col max-container'>
        <div className='flex-1 min-w-[50%] flex flex-col'>
          <h1 className='head-text'>Get in touch</h1>

          <form className='w-full flex flex-col gap-7 mt-14' onSubmit={handleSubmit}>
            <label className='text-black-500 font-semibold'>
              Name
              <input
              type='text'
              name='name'
              className='input'
              placeholder='Your name'
              required
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}/>
              
            </label>
            <label className='text-black-500 font-semibold'>
              Email
              <input
              type='email'
              name='email'
              className='input'
              placeholder='Your_email@gmail.com'
              required
              value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}/>
              
            </label>
            <label className="text-black-500 font-semibold">
              <span className="block">Your Message</span>
              <textarea
                name="message"
                rows={5}
                cols={60}
                className="text_area"
                placeholder="Let me know how I can help you"
                required
                value={form.message}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>

            <button
              type="submit"
              className={`btn ${isloading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isloading}
            >
              {isloading ? 'Sending...' : 'Send Message'}
              
            </button>

          </form>
        </div>
        <div className='lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]'>
          <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 50,
            near: 0.1,
            far: 1000,

          }}
          >
            <Suspense fallback={<Loader/>}>
              <Fox
              currentAnimation={currentAnimation}
              position={[0.5,0.35,0]}
              rotation={[12.6,-0.6,0]}
              scale={[0.40,0.40,0.40]}
              />
              <directionalLight color='#ffffff' intensity={2} position={[0, 0, 1]} />
              <ambientLight color='#ffffff' intensity={0.5}/>
            </Suspense>
          </Canvas>
        </div>
      </section>
    </div>
  )
}

export default Contact;