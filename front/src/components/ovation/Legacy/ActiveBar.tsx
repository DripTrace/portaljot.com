import Link from 'next/link';
import { PiFire } from "react-icons/pi";

const ActiveBar = () => {
    // Placeholder data to replace with backend
    const pfpSections = {
      Projects: [
        { name: 'Project 1', pfp: '/defaultPfp.svg', ova: '0010 $OVA', comments: '5 Comments' },
        { name: 'Project 2', pfp: '/defaultPfp.svg', ova: '0020 $OVA', comments: '10 Comments' },
        { name: 'Project 3', pfp: '/defaultPfp.svg', ova: '0030 $OVA', comments: '15 Comments' },
        { name: 'Project 4', pfp: '/defaultPfp.svg', ova: '0040 $OVA', comments: '20 Comments' },
        
      ],
      Artists: [
        { name: 'Artist 1', pfp: '/defaultPfp.svg', ova: '0050 $OVA', comments: '25 Comments' },
        { name: 'Artist 2', pfp: '/defaultPfp.svg', ova: '0060 $OVA', comments: '30 Comments' },
        { name: 'Artist 3', pfp: '/defaultPfp.svg', ova: '0070 $OVA', comments: '35 Comments' },
        { name: 'Artist 4', pfp: '/defaultPfp.svg', ova: '0080 $OVA', comments: '40 Comments' },
        
      ]
    };

    const noPfpSections = {
        Enthusiasts: [
            { name: 'Enthusiast 1', ova: '0090 $OVA', comments: '45 Comments' },
            { name: 'Enthusiast 2', ova: '0100 $OVA', comments: '50 Comments' },
            { name: 'Enthusiast 2', ova: '0110 $OVA', comments: '55 Comments' },
            { name: 'Enthusiast 2', ova: '0120 $OVA', comments: '60 Comments' },
          ]
    };
  
    return (
      <section className="bg-neutral-800 p-4 flex flex-col w-72 ml-4 rounded-2xl mt-60 ">
        <div className="flex items-center mb-4 justify-center">
          <div className='text-orange-600 mr-2'>
            <PiFire size={30}/>
          </div>
          <div className='text-2xl font-light'>
            Who's Active
          </div>
        </div>
        {Object.entries(pfpSections).map(([sectionTitle, items]) => (
          <div key={sectionTitle} className="mb-6">
            <div className="text-ovteal text-lg mb-2 font-bold">
              {sectionTitle}
            </div>
            {items.map(item => (
              <Link key={item.name} href="/">
                <div className="flex items-center hover:bg-neutral-600 p-2 rounded-lg mb-2 transition duration-100">
                    <div className=' text-white'>
                        {(sectionTitle === 'Projects' || sectionTitle === 'Artists')}
                    </div>
                    <img src={item.pfp} alt="Profile" className="w-12 h-12 rounded-full mr-2" />
                    <div className="flex flex-col">
                        <span>{item.name}</span>
                        <span className="text-xs text-neutral-500 ">
                        {item.ova} & {item.comments}
                        </span>
                    </div>
                </div>
              </Link>
            ))}
          </div>
        ))}
        {Object.entries(noPfpSections).map(([sectionTitle, items]) => (
          <div key={sectionTitle} className="mb-6">
            <div className="text-ovteal text-lg mb-2 font-bold">
              {sectionTitle}
            </div>
            {items.map(item => (
              <Link key={item.name} href="/">
                <div className="flex items-center text-white hover:bg-neutral-600 p-2 rounded-lg mb-2 transition duration-100">
                  <div className="flex flex-col">
                    <span>{item.name}</span>
                    <span className="text-xs text-neutral-500">{item.ova} & {item.comments}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </section>
    )
  }

export default ActiveBar