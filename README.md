# VContact test project

## Used technologies:

- Vue 3, 
- TypeScript, 
- Tailwindcss, 
- Vueuse
- axios

## back-end side

- strapi


## how to install

```jsx
 npm install or yarn install
```

[Link for demo](https://vcontacts.vercel.app/)

## Things I did not do

- contacts filtration
- contacts search

I could do these tasks on fron-end but because I setup strapi
I couldn't finish on time. Nevertheless, I have the exact example of these tasks.

similar project that I did
[github link](https://github.com/sultondev/metasenat-club)
[live demo](https://metsenat-club.vercel.app/)

login: metsenatadmin
password: uF9aH1vZ3bV2kN2y

## Warning !

if you have any troubleshooting while registration or login in project
it's because of back-end register admin panel
my back-end code was deployed on render.com 
and render.com regularly cleans the cache.

[link for back-end admin panel](https://v-contacts-backend.onrender.com/admin)

if any problems with back-end write me

telegram: [@sultondev](https://t.me/sultondev)

## Warning !

Why you might get 401 or 403 error even if in front-end you have token?
It is because of strapi's configuration in roles permission
# this is right settings for back-end

![first image](https://github.com/sultondev/media-files-for-development/blob/main/right-example.png?raw=true)

# in this is wrong settings for back-end
therefore we got 401 or 403 error even if we have correct jwt token

![second image](https://github.com/sultondev/media-files-for-development/blob/main/wrong-example.png?raw=true)

