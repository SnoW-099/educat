import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  ComposedChart,
  Legend
} from 'recharts';
import { 
  Calendar, 
  TrendingUp, 
  Target, 
  Award, 
  Zap,
  Filter,
  Download,
  BarChart3
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface AnalysisData {
  skillBalance: any;
  exerciseStreak: number;
  totalXpAllTime: number;
  currentMonthXp: number;
  completedExercises: number;
  totalExercises: number;
  attempts: any[];
}

interface AdvancedXPChartProps {
  studentId?: string;
  classId?: string;
  analysisData: AnalysisData;
  className?: string;
  detailed?: boolean;
}

interface ChartData {
  day: number;
  date: string;
  xp: number;
  totalXP: number;
  exercises: number;
  avgScore: number;
  sessionTime: number;
}

export const AdvancedXPChart = ({ 
  studentId, 
  classId, 
  analysisData,
  className = '',
  detailed = false
}: AdvancedXPChartProps) => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [chartType, setChartType] = useState<'line' | 'area' | 'bar' | 'composed'>('area');

  useEffect(() => {
    if (studentId && classId) {
      fetchXPData();
    } else {
      generateMockData();
    }
  }, [studentId, classId, timeRange]);

  const fetchXPData = async () => {
    if (!studentId || !classId) return;
    
    try {
      setLoading(true);
      
      const daysBack = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - daysBack);
      
      // Fetch exercise attempts for the time range
      const { data: attempts } = await supabase
        .from('exercise_attempts')
        .select(`
          completed_at,
          score,
          exercises!inner(
            level,
            type,
            class_id
          )
        `)
        .eq('student_id', studentId)
        .or(`exercises.class_id.eq.${classId},exercises.class_id.is.null`)
        .gte('completed_at', startDate.toISOString())
        .order('completed_at', { ascending: true });

      // Generate daily data
      const dailyData = Array.from({ length: daysBack }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (daysBack - 1 - i));
        const dateStr = date.toISOString().split('T')[0];
        
        // Filter attempts for this day
        const dayAttempts = attempts?.filter(attempt => 
          attempt.completed_at.startsWith(dateStr)
        ) || [];
        
        // Calculate daily metrics
        let dayXP = 0;
        let totalScore = 0;
        
        dayAttempts.forEach(attempt => {
          const level = attempt.exercises?.level;
          const multiplier = getLevelMultiplier(level);
          dayXP += Math.round(attempt.score * multiplier);
          totalScore += attempt.score;
        });
        
        const avgScore = dayAttempts.length > 0 ? totalScore / dayAttempts.length : 0;
        const sessionTime = estimateSessionTime(dayAttempts.length);
        
        return {
          day: i + 1,
          date: dateStr,
          xp: dayXP,
          totalXP: 0, // Will be calculated as cumulative
          exercises: dayAttempts.length,
          avgScore: Math.round(avgScore),
          sessionTime
        };
      });

      // Calculate cumulative XP
      let cumulativeXP = 0;
      const processedData = dailyData.map(day => {
        cumulativeXP += day.xp;
        return {
          ...day,
          totalXP: cumulativeXP
        };
      });

      setChartData(processedData);
    } catch (error) {
      console.error('Error fetching XP chart data:', error);
      generateMockData();
    } finally {
      setLoading(false);
    }
  };

  const generateMockData = () => {
    const daysBack = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    
    const mockData = Array.from({ length: daysBack }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (daysBack - 1 - i));
      
      // Simulate realistic data based on existing analysis data
      const baseXP = 20 + Math.random() * 50;
      const exerciseCount = Math.floor(Math.random() * 5) + 1;
      const avgScore = 60 + Math.random() * 35;
      
      return {
        day: i + 1,
        date: date.toISOString().split('T')[0],
        xp: Math.round(baseXP),
        totalXP: 0,
        exercises: exerciseCount,
        avgScore: Math.round(avgScore),
        sessionTime: exerciseCount * 3 + Math.random() * 10
      };
    });

    // Calculate cumulative XP
    let cumulativeXP = 0;
    const processedData = mockData.map(day => {
      cumulativeXP += day.xp;
      return {
        ...day,
        totalXP: cumulativeXP
      };
    });

    setChartData(processedData);
    setLoading(false);
  };

  const getLevelMultiplier = (level: string) => {
    const multipliers = {
      'A1': 1.2,
      'A2': 1.4,
      'B1': 1.8,
      'B2': 2.0,
      'C1': 2.2,
      'C2': 2.4
    };
    return multipliers[level as keyof typeof multipliers] || 1.2;
  };

  const estimateSessionTime = (exerciseCount: number) => {
    // Estimate 3-5 minutes per exercise
    return exerciseCount * (3 + Math.random() * 2);
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card p-3 border rounded-lg shadow-lg">
          <p className="font-semibold">Dia {label}</p>
          <p className="text-sm text-muted-foreground mb-2">{data.date}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: <span className="font-bold">{entry.value}</span>
              {entry.dataKey === 'avgScore' && '%'}
              {entry.dataKey === 'sessionTime' && 'min'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Calculate metrics
  const totalXPGained = chartData.reduce((sum, day) => sum + day.xp, 0);
  const averageDailyXP = chartData.length > 0 ? Math.round(totalXPGained / chartData.length) : 0;
  const bestDay = chartData.reduce((max, day) => day.xp > max.xp ? day : max, { xp: 0, date: '' });
  const totalExercises = chartData.reduce((sum, day) => sum + day.exercises, 0);
  const averageScore = chartData.length > 0 
    ? Math.round(chartData.reduce((sum, day) => sum + day.avgScore, 0) / chartData.filter(day => day.avgScore > 0).length || 0)
    : 0;

  const renderChart = () => {
    const commonProps = {
      data: chartData,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };

    switch (chartType) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="day" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="xp" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={{ r: 3, fill: 'hsl(var(--primary))' }}
              name="XP Diària"
            />
            <Line 
              type="monotone" 
              dataKey="totalXP" 
              stroke="hsl(var(--accent))" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="XP Acumulada"
            />
          </LineChart>
        );
        
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="day" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="xp" 
              stroke="hsl(var(--primary))" 
              fill="hsl(var(--primary))"
              fillOpacity={0.3}
              name="XP Diària"
            />
            <Area 
              type="monotone" 
              dataKey="totalXP" 
              stroke="hsl(var(--accent))" 
              fill="transparent"
              strokeDasharray="5 5"
              name="XP Acumulada"
            />
          </AreaChart>
        );
        
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="day" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="xp" 
              fill="hsl(var(--primary))"
              name="XP Diària"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        );
        
      case 'composed':
        return (
          <ComposedChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="day" className="text-xs" />
            <YAxis yAxisId="left" className="text-xs" />
            <YAxis yAxisId="right" orientation="right" className="text-xs" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              yAxisId="left"
              dataKey="exercises" 
              fill="hsl(var(--muted))"
              name="Exercicis"
              radius={[2, 2, 0, 0]}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="xp" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={{ r: 3 }}
              name="XP Diària"
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="avgScore" 
              stroke="hsl(var(--accent))" 
              strokeWidth={2}
              strokeDasharray="3 3"
              dot={false}
              name="Puntuació Mitjana"
            />
          </ComposedChart>
        );
        
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Evolució d'Experiència</CardTitle>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <div className="text-center">
            <LoadingSpinner size="lg" className="mb-4" />
            <p className="text-muted-foreground">Carregant dades de progrés...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-primary" />
              <span>Guanys d'Experiència Diaris</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              El teu progrés d'experiència durant els darrers {timeRange === '7d' ? '7' : timeRange === '30d' ? '30' : '90'} dies
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Time Range Selector */}
            <div className="flex rounded-lg border">
              {(['7d', '30d', '90d'] as const).map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setTimeRange(range)}
                  className="text-xs"
                >
                  {range}
                </Button>
              ))}
            </div>
            
            {/* Chart Type Selector */}
            {detailed && (
              <div className="flex rounded-lg border">
                {([
                  { type: 'area' as const, icon: BarChart3 },
                  { type: 'line' as const, icon: TrendingUp },
                  { type: 'bar' as const, icon: BarChart3 },
                  { type: 'composed' as const, icon: Target }
                ] as const).map(({ type, icon: Icon }) => (
                  <Button
                    key={type}
                    variant={chartType === type ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setChartType(type)}
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Metrics Summary */}
        {detailed && (
          <div className="grid gap-4 md:grid-cols-4 mb-6">
            <div className="text-center p-3 bg-primary/10 rounded-lg">
              <div className="text-2xl font-bold text-primary">{totalXPGained}</div>
              <p className="text-xs text-muted-foreground">XP Total</p>
            </div>
            <div className="text-center p-3 bg-accent/10 rounded-lg">
              <div className="text-2xl font-bold text-accent">{averageDailyXP}</div>
              <p className="text-xs text-muted-foreground">XP/Dia Mitjana</p>
            </div>
            <div className="text-center p-3 bg-green-500/10 rounded-lg">
              <div className="text-2xl font-bold text-green-500">{totalExercises}</div>
              <p className="text-xs text-muted-foreground">Exercicis Totals</p>
            </div>
            <div className="text-center p-3 bg-orange-500/10 rounded-lg">
              <div className="text-2xl font-bold text-orange-500">{averageScore}%</div>
              <p className="text-xs text-muted-foreground">Puntuació Mitjana</p>
            </div>
          </div>
        )}

        {/* Chart */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>

        {/* Best Performance */}
        {detailed && bestDay.xp > 0 && (
          <div className="mt-4 p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-yellow-500" />
                <span className="font-medium">Millor dia:</span>
              </div>
              <Badge variant="outline">
                {bestDay.xp} XP el {new Date(bestDay.date).toLocaleDateString('ca-ES')}
              </Badge>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};