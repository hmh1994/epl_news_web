"use client";
import React, { useState } from "react";
import {
  Search,
  Grid,
  List,
  X,
  Award,
  Calendar,
  MapPin,
  Activity,
  Users,
  ArrowRight,
  BarChart3,
} from "lucide-react";

export const TestPlayerPage = () => {
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("all");
  const [selectedTeam, setSelectedTeam] = useState("all");
  const [activeFilters, setActiveFilters] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  // 선수 데이터 (간소화)
  const players = [
    {
      id: 1,
      name: "Erling Haaland",
      photo: "🇳🇴",
      team: "Manchester City",
      teamLogo: "🏆",
      position: "ST",
      age: 23,
      nationality: "Norway",
      height: 195,
      weight: 88,
      goals: 36,
      assists: 8,
      rating: 9.2,
      marketValue: "€180M",
      stats: {
        pace: 89,
        shooting: 94,
        passing: 65,
        dribbling: 80,
        defending: 45,
        physical: 88,
      },
      career: [
        { year: "2022-", team: "Manchester City", matches: 53, goals: 52 },
        { year: "2020-22", team: "Borussia Dortmund", matches: 89, goals: 86 },
      ],
    },
    {
      id: 2,
      name: "Kevin De Bruyne",
      photo: "🇧🇪",
      team: "Manchester City",
      teamLogo: "🏆",
      position: "CAM",
      age: 32,
      nationality: "Belgium",
      height: 181,
      weight: 70,
      goals: 7,
      assists: 16,
      rating: 8.9,
      marketValue: "€85M",
      stats: {
        pace: 76,
        shooting: 86,
        passing: 93,
        dribbling: 87,
        defending: 64,
        physical: 78,
      },
      career: [
        { year: "2015-", team: "Manchester City", matches: 382, goals: 102 },
        { year: "2012-14", team: "VfL Wolfsburg", matches: 73, goals: 13 },
      ],
    },
    {
      id: 3,
      name: "Bukayo Saka",
      photo: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      team: "Arsenal",
      teamLogo: "🔴",
      position: "RW",
      age: 22,
      nationality: "England",
      height: 178,
      weight: 72,
      goals: 14,
      assists: 11,
      rating: 8.6,
      marketValue: "€120M",
      stats: {
        pace: 85,
        shooting: 79,
        passing: 81,
        dribbling: 86,
        defending: 52,
        physical: 73,
      },
      career: [{ year: "2018-", team: "Arsenal", matches: 212, goals: 48 }],
    },
    {
      id: 4,
      name: "Mohamed Salah",
      photo: "🇪🇬",
      team: "Liverpool",
      teamLogo: "❤️",
      position: "RW",
      age: 31,
      nationality: "Egypt",
      height: 175,
      weight: 71,
      goals: 18,
      assists: 10,
      rating: 8.4,
      marketValue: "€65M",
      stats: {
        pace: 90,
        shooting: 87,
        passing: 81,
        dribbling: 90,
        defending: 45,
        physical: 75,
      },
      career: [
        { year: "2017-", team: "Liverpool", matches: 323, goals: 211 },
        { year: "2014-16", team: "AS Roma", matches: 83, goals: 34 },
      ],
    },
  ];

  const positions = ["all", "GK", "DF", "MF", "FW"];
  const teams = ["all", "Manchester City", "Arsenal", "Liverpool", "Chelsea"];

  const statPalette = {
    green: {
      bg: "bg-green-400/10",
      border: "border-green-400/30",
      text: "text-green-400",
    },
    teal: {
      bg: "bg-teal-400/10",
      border: "border-teal-400/30",
      text: "text-teal-400",
    },
    emerald: {
      bg: "bg-emerald-400/10",
      border: "border-emerald-400/30",
      text: "text-emerald-400",
    },
    yellow: {
      bg: "bg-yellow-400/10",
      border: "border-yellow-400/30",
      text: "text-yellow-400",
    },
  };

  const getStatStyles = (key) => statPalette[key] ?? statPalette.teal;

  const handleFilterAdd = (type, value) => {
    const filter = { type, value };
    if (!activeFilters.find((f) => f.type === type && f.value === value)) {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const handleFilterRemove = (filter) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter));
    if (filter.type === "position") setSelectedPosition("all");
    if (filter.type === "team") setSelectedTeam("all");
  };

  const handlePlayerSelect = (player) => {
    if (selectedPlayers.find((p) => p.id === player.id)) {
      setSelectedPlayers(selectedPlayers.filter((p) => p.id !== player.id));
    } else if (selectedPlayers.length < 3) {
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };

  const filteredPlayers = players.filter((player) => {
    const matchesSearch = player.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPosition =
      selectedPosition === "all" || player.position.includes(selectedPosition);
    const matchesTeam = selectedTeam === "all" || player.team === selectedTeam;
    return matchesSearch && matchesPosition && matchesTeam;
  });

  // Header
  const Header = () => (
    <header className='fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-3xl border-b border-white/10 shadow-2xl'>
      <div className='max-w-7xl mx-auto px-6 py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-6'>
            <div className='relative'>
              <div className='w-14 h-14 bg-gradient-to-br from-[#169976] via-emerald-600 to-teal-600 rounded-3xl flex items-center justify-center text-2xl shadow-2xl'>
                ⚽
              </div>
              <div className='absolute -inset-1 bg-gradient-to-br from-[#169976] via-emerald-600 to-teal-600 rounded-3xl blur opacity-40 animate-pulse'></div>
            </div>
            <div>
              <span className='text-4xl font-black bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent'>
                Player Hub
              </span>
              <div className='text-sm text-slate-400 font-medium'>
                Professional Player Database
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );

  // Search & Filter Bar
  const SearchFilterBar = () => (
    <div className='bg-slate-900/40 backdrop-blur-3xl rounded-3xl p-6 border border-white/10 shadow-2xl mb-8'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-4'>
        {/* Search */}
        <div className='lg:col-span-5 relative'>
          <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400' />
          <input
            type='text'
            placeholder='선수 이름 검색...'
            className='w-full bg-slate-800/50 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Position Filter */}
        <div className='lg:col-span-3'>
          <select
            className='w-full bg-slate-800/50 border border-white/10 rounded-2xl px-4 py-4 text-white focus:outline-none focus:border-emerald-400'
            value={selectedPosition}
            onChange={(e) => {
              setSelectedPosition(e.target.value);
              if (e.target.value !== "all")
                handleFilterAdd("position", e.target.value);
            }}
          >
            <option value='all'>모든 포지션</option>
            {positions.slice(1).map((pos) => (
              <option key={pos} value={pos}>
                {pos}
              </option>
            ))}
          </select>
        </div>

        {/* Team Filter */}
        <div className='lg:col-span-3'>
          <select
            className='w-full bg-slate-800/50 border border-white/10 rounded-2xl px-4 py-4 text-white focus:outline-none focus:border-emerald-400'
            value={selectedTeam}
            onChange={(e) => {
              setSelectedTeam(e.target.value);
              if (e.target.value !== "all")
                handleFilterAdd("team", e.target.value);
            }}
          >
            <option value='all'>모든 팀</option>
            {teams.slice(1).map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
        </div>

        {/* View Toggle */}
        <div className='lg:col-span-1 flex space-x-2'>
          <button
            onClick={() => setViewMode("grid")}
            className={`flex-1 p-4 rounded-2xl transition-all ${
              viewMode === "grid"
                ? "bg-[#169976] text-white"
                : "bg-slate-800/50 text-slate-400 hover:text-white"
            }`}
          >
            <Grid className='w-5 h-5 mx-auto' />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`flex-1 p-4 rounded-2xl transition-all ${
              viewMode === "list"
                ? "bg-[#169976] text-white"
                : "bg-slate-800/50 text-slate-400 hover:text-white"
            }`}
          >
            <List className='w-5 h-5 mx-auto' />
          </button>
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className='flex flex-wrap gap-2 mt-4'>
          {activeFilters.map((filter, idx) => (
            <div
              key={idx}
              className='flex items-center space-x-2 bg-[#169976]/20 border border-emerald-400/40 text-emerald-300 px-4 py-2 rounded-xl text-sm font-medium'
            >
              <span>{filter.value}</span>
              <button
                onClick={() => handleFilterRemove(filter)}
                className='hover:text-white'
              >
                <X className='w-4 h-4' />
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              setActiveFilters([]);
              setSelectedPosition("all");
              setSelectedTeam("all");
            }}
            className='text-slate-400 hover:text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-slate-800/50'
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );

  // Player Card (Grid View)
  const PlayerCard = ({ player }) => {
    const isSelected = selectedPlayers.find((p) => p.id === player.id);
    return (
      <div
        className={`group relative bg-slate-900/60 backdrop-blur-3xl rounded-3xl p-6 border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer ${
          isSelected
            ? "border-emerald-400 bg-gradient-to-br from-[#169976]/20 to-teal-500/20 shadow-emerald-400/20"
            : "border-white/10 hover:border-white/20"
        }`}
        onClick={() => setSelectedPlayer(player)}
      >
        {isSelected && (
          <div className='absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-[#169976] via-emerald-600 to-teal-600 rounded-full flex items-center justify-center shadow-lg'>
            <Award className='w-4 h-4 text-white' />
          </div>
        )}

        <div className='flex items-start justify-between mb-4'>
          <div className='w-16 h-16 bg-gradient-to-br from-[#169976] to-teal-500 rounded-2xl flex items-center justify-center text-3xl shadow-xl'>
            {player.photo}
          </div>
          <div
            className={`px-3 py-1 rounded-lg text-xs font-bold ${
              player.position.includes("GK")
                ? "bg-yellow-400/20 text-yellow-400"
                : player.position.includes("D")
                ? "bg-teal-400/20 text-teal-400"
                : player.position.includes("M")
                ? "bg-green-400/20 text-green-400"
                : "bg-red-400/20 text-red-400"
            }`}
          >
            {player.position}
          </div>
        </div>

        <h3 className='text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors'>
          {player.name}
        </h3>
        <div className='flex items-center space-x-2 text-slate-400 text-sm mb-4'>
          <div className='w-6 h-6 bg-gradient-to-br from-[#169976] to-teal-500 rounded-lg flex items-center justify-center text-xs'>
            {player.teamLogo}
          </div>
          <span>{player.team}</span>
        </div>

        <div className='grid grid-cols-3 gap-3 mb-4'>
          <div className='text-center p-3 bg-slate-800/30 rounded-xl'>
            <div className='text-xl font-bold text-green-400'>
              {player.goals}
            </div>
            <div className='text-xs text-slate-400'>Goals</div>
          </div>
          <div className='text-center p-3 bg-slate-800/30 rounded-xl'>
            <div className='text-xl font-bold text-teal-400'>
              {player.assists}
            </div>
            <div className='text-xs text-slate-400'>Assists</div>
          </div>
          <div className='text-center p-3 bg-slate-800/30 rounded-xl'>
            <div className='text-xl font-bold text-yellow-400'>
              {player.rating}
            </div>
            <div className='text-xs text-slate-400'>Rating</div>
          </div>
        </div>

        <div className='flex items-center justify-between pt-4 border-t border-white/10'>
          <span className='text-slate-400 text-sm'>Market Value</span>
          <span className='text-white font-bold'>{player.marketValue}</span>
        </div>

        {selectedPlayers.length > 0 && selectedPlayers.length < 3 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePlayerSelect(player);
            }}
            className='w-full mt-4 py-3 bg-[#169976] hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors'
          >
            {isSelected ? "Remove from Compare" : "Add to Compare"}
          </button>
        )}
      </div>
    );
  };

  // Player List Item
  const PlayerListItem = ({ player }) => (
    <div
      className='group bg-slate-900/60 backdrop-blur-3xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-xl cursor-pointer'
      onClick={() => setSelectedPlayer(player)}
    >
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-6'>
          <div className='w-16 h-16 bg-gradient-to-br from-[#169976] to-teal-500 rounded-2xl flex items-center justify-center text-2xl shadow-xl'>
            {player.photo}
          </div>
          <div>
            <h3 className='text-xl font-bold text-white group-hover:text-emerald-300 transition-colors'>
              {player.name}
            </h3>
            <div className='flex items-center space-x-4 text-sm text-slate-400'>
              <span>{player.team}</span>
              <span>•</span>
              <span>{player.age}세</span>
              <span>•</span>
              <span>{player.nationality}</span>
            </div>
          </div>
        </div>

        <div className='flex items-center space-x-8'>
          <div className='text-center'>
            <div className='text-2xl font-bold text-green-400'>
              {player.goals}
            </div>
            <div className='text-xs text-slate-400'>Goals</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold text-teal-400'>
              {player.assists}
            </div>
            <div className='text-xs text-slate-400'>Assists</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold text-yellow-400'>
              {player.rating}
            </div>
            <div className='text-xs text-slate-400'>Rating</div>
          </div>
          <div className='text-white font-bold'>{player.marketValue}</div>
        </div>
      </div>
    </div>
  );

  // Player Detail Modal
  const PlayerDetail = ({ player, onClose }) => {
    if (!player) return null;

    return (
      <div
        className='fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm'
        onClick={onClose}
      >
        <div
          className='bg-slate-900/95 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto'
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className='relative bg-gradient-to-r from-[#169976]/20 via-emerald-600/20 to-teal-600/20 p-8 border-b border-white/10'>
            <button
              onClick={onClose}
              className='absolute top-6 right-6 w-10 h-10 bg-slate-800/50 hover:bg-slate-700 rounded-xl flex items-center justify-center transition-colors'
            >
              <X className='w-5 h-5 text-white' />
            </button>

            <div className='flex items-start space-x-8'>
              <div className='w-32 h-32 bg-gradient-to-br from-[#169976] to-teal-500 rounded-3xl flex items-center justify-center text-6xl shadow-2xl'>
                {player.photo}
              </div>
              <div className='flex-1'>
                <div className='flex items-center space-x-4 mb-4'>
                  <h2 className='text-4xl font-black text-white'>
                    {player.name}
                  </h2>
                  <div
                    className={`px-4 py-2 rounded-xl text-sm font-bold ${
                      player.position.includes("GK")
                        ? "bg-yellow-400/20 text-yellow-400"
                        : player.position.includes("D")
                        ? "bg-teal-400/20 text-teal-400"
                        : player.position.includes("M")
                        ? "bg-green-400/20 text-green-400"
                        : "bg-red-400/20 text-red-400"
                    }`}
                  >
                    {player.position}
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-4 text-slate-300'>
                  <div className='flex items-center space-x-2'>
                    <Users className='w-4 h-4 text-emerald-400' />
                    <span>{player.team}</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <MapPin className='w-4 h-4 text-teal-400' />
                    <span>{player.nationality}</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Calendar className='w-4 h-4 text-green-400' />
                    <span>{player.age} years old</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Activity className='w-4 h-4 text-yellow-400' />
                    <span>
                      {player.height}cm / {player.weight}kg
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className='p-8'>
            <h3 className='text-2xl font-bold text-white mb-6'>
              Season Statistics
            </h3>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
              {[
                { label: "Goals", value: player.goals, color: "green" },
                { label: "Assists", value: player.assists, color: "teal" },
                { label: "Rating", value: player.rating, color: "yellow" },
                { label: "Value", value: player.marketValue, color: "emerald" },
              ].map((stat, idx) => {
                const styles = getStatStyles(stat.color);
                return (
                  <div
                    key={idx}
                    className={`p-6 ${styles.bg} border ${styles.border} rounded-2xl text-center`}
                  >
                    <div className={`text-3xl font-black ${styles.text} mb-2`}>
                      {stat.value}
                    </div>
                    <div className='text-slate-400 text-sm'>{stat.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Radar Chart (Simplified) */}
            <h3 className='text-2xl font-bold text-white mb-6'>
              Player Attributes
            </h3>
            <div className='bg-slate-800/30 rounded-2xl p-6 mb-8'>
              <div className='space-y-4'>
                {Object.entries(player.stats).map(([key, value]) => (
                  <div key={key}>
                    <div className='flex items-center justify-between mb-2'>
                      <span className='text-white font-medium capitalize'>
                        {key}
                      </span>
                      <span className='text-emerald-400 font-bold'>{value}</span>
                    </div>
                    <div className='w-full bg-slate-600 rounded-full h-2'>
                      <div
                        className='bg-gradient-to-r from-[#169976] to-teal-400 h-2 rounded-full transition-all duration-1000'
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Career Timeline */}
            <h3 className='text-2xl font-bold text-white mb-6'>
              Career History
            </h3>
            <div className='space-y-4'>
              {player.career.map((period, idx) => (
                <div
                  key={idx}
                  className='flex items-center space-x-4 p-4 bg-slate-800/30 rounded-2xl border border-white/10'
                >
                  <div className='w-16 h-16 bg-gradient-to-br from-[#169976] to-teal-500 rounded-xl flex items-center justify-center text-2xl shadow-lg'>
                    🏆
                  </div>
                  <div className='flex-1'>
                    <div className='text-white font-bold text-lg'>
                      {period.team}
                    </div>
                    <div className='text-slate-400 text-sm'>{period.year}</div>
                  </div>
                  <div className='text-right'>
                    <div className='text-white font-bold'>
                      {period.matches} matches
                    </div>
                    <div className='text-green-400 font-semibold'>
                      {period.goals} goals
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Player Comparison
  const PlayerComparison = () => {
    if (selectedPlayers.length < 2) return null;

    return (
      <div className='fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-3xl border-t border-white/10 shadow-2xl'>
        <div className='max-w-7xl mx-auto px-6 py-6'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center space-x-3'>
              <BarChart3 className='w-6 h-6 text-emerald-400' />
              <h3 className='text-xl font-bold text-white'>
                Player Comparison
              </h3>
              <span className='text-slate-400 text-sm'>
                ({selectedPlayers.length}/3 selected)
              </span>
            </div>
            <div className='flex items-center space-x-4'>
              <button
                onClick={() => setShowComparison(!showComparison)}
                className='px-6 py-3 bg-[#169976] hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors flex items-center space-x-2'
              >
                <span>{showComparison ? "Hide" : "Show"} Comparison</span>
                <ArrowRight className='w-4 h-4' />
              </button>
              <button
                onClick={() => setSelectedPlayers([])}
                className='px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-colors'
              >
                Clear All
              </button>
            </div>
          </div>

          {showComparison && (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {selectedPlayers.map((player) => (
                <div
                  key={player.id}
                  className='bg-slate-800/50 rounded-2xl p-6 border border-white/10'
                >
                  <div className='flex items-center space-x-4 mb-4'>
                    <div className='w-12 h-12 bg-gradient-to-br from-[#169976] to-teal-500 rounded-xl flex items-center justify-center text-xl'>
                      {player.photo}
                    </div>
                    <div>
                      <h4 className='text-white font-bold'>{player.name}</h4>
                      <div className='text-slate-400 text-sm'>
                        {player.team}
                      </div>
                    </div>
                  </div>
                  <div className='grid grid-cols-3 gap-2 text-center'>
                    <div>
                      <div className='text-lg font-bold text-green-400'>
                        {player.goals}
                      </div>
                      <div className='text-xs text-slate-400'>Goals</div>
                    </div>
                    <div>
                      <div className='text-lg font-bold text-teal-400'>
                        {player.assists}
                      </div>
                      <div className='text-xs text-slate-400'>Assists</div>
                    </div>
                    <div>
                      <div className='text-lg font-bold text-yellow-400'>
                        {player.rating}
                      </div>
                      <div className='text-xs text-slate-400'>Rating</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className='min-h-screen bg-slate-950 text-white pb-32'>
      <Header />

      {/* Hero */}
      <section className='relative pt-28 pb-16 overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900'></div>
        <div className='relative z-10 max-w-7xl mx-auto px-6 text-center'>
          <h1 className='text-6xl md:text-7xl font-black mb-6'>
            <span className='bg-gradient-to-r from-white to-teal-100 bg-clip-text text-transparent'>
              Player
            </span>
            <br />
            <span className='bg-gradient-to-r from-[#169976] via-emerald-400 to-teal-400 bg-clip-text text-transparent'>
              Database
            </span>
          </h1>
          <p className='text-xl text-slate-300 max-w-3xl mx-auto'>
            프리미어리그 최고의 선수들을 검색하고 비교하세요
          </p>
        </div>
      </section>

      <main className='max-w-7xl mx-auto px-6'>
        <SearchFilterBar />

        {/* Results Count */}
        <div className='flex items-center justify-between mb-8'>
          <h2 className='text-2xl font-bold text-white'>
            {filteredPlayers.length} Players Found
          </h2>
          {selectedPlayers.length > 0 && (
            <div className='text-emerald-400 font-semibold'>
              {selectedPlayers.length} selected for comparison
            </div>
          )}
        </div>

        {/* Player Grid/List */}
        {viewMode === "grid" ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {filteredPlayers.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        ) : (
          <div className='space-y-4'>
            {filteredPlayers.map((player) => (
              <PlayerListItem key={player.id} player={player} />
            ))}
          </div>
        )}

        {filteredPlayers.length === 0 && (
          <div className='text-center py-20'>
            <div className='text-6xl mb-4'>🔍</div>
            <h3 className='text-2xl font-bold text-white mb-2'>
              No Players Found
            </h3>
            <p className='text-slate-400'>Try adjusting your search filters</p>
          </div>
        )}
      </main>

      {/* Modals */}
      {selectedPlayer && (
        <PlayerDetail
          player={selectedPlayer}
          onClose={() => setSelectedPlayer(null)}
        />
      )}

      {selectedPlayers.length > 0 && <PlayerComparison />}
    </div>
  );
};
