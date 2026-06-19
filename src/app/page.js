import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="landing-page">
      <div className="box">
        <Image src="/assets/images/White_Logo.png" width={180} height={180} className="logo" alt="Everglow Travel" />
        <h1 className="title">
          <span className="white">WELCOME</span>
          <span className="blue">TO</span>
        </h1>
        <h2 className="brand">Everglow Travel</h2>
        <p>กรุณาเลือกภาษา / PLEASE SELECT LANGUAGE</p>
        <div className="btn-group">
          <div>
            <Link href="/th" className="btn thai">TH ไทย</Link>
            <small>สำหรับคนไทย</small>
          </div>
          <div>
            <Link href="/en" className="btn eng">ENG English</Link>
            <small>For Foreigners</small>
        </div>
    </div>
      </div>
    </div>
  );
}