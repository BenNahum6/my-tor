import Image from "next/image";
import Link from 'next/link';

import pic from "../assets/Bibi.jpeg"
import pic1 from "../assets/Itamar.jpeg"
import pic2 from "../assets/Kahana.jpeg"
import pic3 from "../assets/Michael.jpeg"

//TODO Put this in DB
const workers = [
    {
      name: 'Bibi',
      image: pic,
      description: 'I\'m love champain.',
    },
    {
      name: 'Itamar',
      image: pic1,
      description: 'I\'m love demokrat.',
    },
    {
      name: 'Kahana',
      image: pic2,
      description: 'I\'m love tora.',
    },
    {
      name: 'Michael',
      image: pic3,
      description: 'I\'m bagatz.',
    }
  ];
  
  export default function Workers() {

    return (
      <div className="min-h-screen bg-base-200">
        {workers.map((worker, index) => (
          <div key={index} className="hero bg-base-100 my-4 flex items-center">
            <Image
              src={worker.image}
              alt={worker.name}
              className="w-56 h-64 object-cover rounded-lg shadow-2xl flex-shrink-0"
            />
            <div className="flex-1 flex flex-col items-center text-center">
              <h1 className="text-4xl font-bold mb-4">{worker.name}</h1>
              <p className="py-6 mb-4">{worker.description}</p>
              <Link href={`/pages/${worker.name}`} className="hover:underline">
                <button className="btn btn-primary">Get Started</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  }
  